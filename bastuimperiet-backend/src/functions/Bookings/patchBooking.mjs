import middy from "@middy/core";
import {
    getBookingByIdInternal,
    updateBookingStatus,
    saveCalendarEventId,
    getAllBookings,
    hasBookingOverlap,
} from "../../services/bookingService.mjs";
import { runIntegration } from "../../utils/runIntegration.js";
import { createBookingCalendarEvent, deleteBookingCalendarEvent } from "../../services/googleCalendarService.mjs";
import { sendBookingConfirmedToGuest, sendBookingDeclinedToGuest, sendBookingCancelledToGuest } from "../../services/mailerService.mjs";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import { validateStatus } from "../../middlewares/validateStatus.mjs";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../middlewares/errorHandler.js";

const ALLOWED_STATUSES = new Set(["pending", "confirmed", "declined", "cancelled"]);

export const handler = middy(async (event) => {
    const bookingId = event.pathParameters.id;
    const { status } = event.body;
    const normalizedStatus = status?.trim().toLowerCase();

    if (!ALLOWED_STATUSES.has(normalizedStatus)) {
        return { statusCode: 400, body: JSON.stringify({ message: "Ogiltig status" }) };
    }

    try {
        const fullBooking = await getBookingByIdInternal(process.env.TABLE_NAME, bookingId);
        if (!fullBooking) return { statusCode: 404, body: JSON.stringify({ message: "Hittades inte" }) };

        // --- 1. SÄKERHETSKONTROLL FÖR CONFIRMED ---
        if (normalizedStatus === "confirmed") {
            const allBookings = await getAllBookings(process.env.TABLE_NAME);
            // Kolla krockar med ANDRA bekräftade bokningar
            const otherConfirmed = allBookings.filter((b) => b.id !== bookingId && b.status === "confirmed");
            if (hasBookingOverlap(fullBooking.startDate, fullBooking.endDate, otherConfirmed)) {
                return { statusCode: 409, body: JSON.stringify({ message: "Datumen är redan upptagna av en annan bekräftad bokning." }) };
            }
        }

        // --- 2. UPPDATERA STATUS I DB ---
        const updatedBooking = await updateBookingStatus(process.env.TABLE_NAME, bookingId, normalizedStatus);

        let results = { calendar: null, email: null };

        switch (normalizedStatus) {
            case "confirmed":
                // TA BORT FÖRFRÅGAN (den gråa)
                if (fullBooking.calendarEventId) {
                    await runIntegration("Delete Old Event", deleteBookingCalendarEvent(fullBooking.calendarEventId));
                }
                // SKAPA BEKRÄFTELSE (den gröna)
                const newEvent = await runIntegration(
                    "Create Confirmed Event",
                    createBookingCalendarEvent({
                        ...fullBooking,
                        name: `Bastu-bokning: ${fullBooking.name}`,
                        calendarId: process.env.GOOGLE_PUBLIC_CALENDAR_ID,
                    }),
                );

                if (newEvent?.id) {
                    await saveCalendarEventId(process.env.TABLE_NAME, bookingId, newEvent.id);
                }

                results.email = await runIntegration("Confirm Email", sendBookingConfirmedToGuest({ ...fullBooking }));
                break;

            case "declined":
            case "cancelled":
                // STÄDA BORT EVENTET HELT FRÅN KALENDERN
                if (fullBooking.calendarEventId) {
                    await runIntegration("Delete Event", deleteBookingCalendarEvent(fullBooking.calendarEventId));
                    await saveCalendarEventId(process.env.TABLE_NAME, bookingId, null);
                }

                const mailFunc = normalizedStatus === "declined" ? sendBookingDeclinedToGuest : sendBookingCancelledToGuest;
                results.email = await runIntegration("Status Email", mailFunc({ ...fullBooking }));
                break;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ...updatedBooking, integrations: results }),
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
})
    .use(httpJsonBodyParser())
    .use(validateStatus())
    .use(verifyAdminToken())
    .use(errorHandler());

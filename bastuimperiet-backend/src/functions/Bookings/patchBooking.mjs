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
    const { status, force } = event.body;
    const normalizedStatus = status?.trim().toLowerCase();

    if (!ALLOWED_STATUSES.has(normalizedStatus)) {
        return { statusCode: 400, body: JSON.stringify({ message: "Ogiltig status" }) };
    }

    try {
        const fullBooking = await getBookingByIdInternal(process.env.TABLE_NAME, bookingId);
        if (!fullBooking) return { statusCode: 404, body: JSON.stringify({ message: "Hittades inte" }) };

        let warning = null;

        // --- 1. SÄKERHETSKONTROLL FÖR CONFIRMED ---
        if (normalizedStatus === "confirmed") {
            const allBookings = await getAllBookings(process.env.TABLE_NAME);
            // Kolla krockar med ANDRA bekräftade bokningar
            const otherConfirmed = allBookings.filter((b) => b.id !== bookingId && b.status === "confirmed");
            if (hasBookingOverlap(fullBooking.startDate, fullBooking.endDate, otherConfirmed)) {
                if (!force) {
                    return {
                        statusCode: 409,
                        body: JSON.stringify({ message: "Datumen är redan upptagna av en annan bekräftad bokning.", warning: true }),
                    };
                }
                warning = "Observera: Du bekräftar en bokning som krockar med en annan bekräftad bokning.";
            }
            const checkInDateTime = new Date(`${fullBooking.startDate}T15:00:00`);
            if (checkInDateTime < new Date()) {
                warning = warning
                    ? warning + " Samt: Du bekräftar en bokning vars startdatum redan har passerat."
                    : "Observera: Du bekräftar en bokning vars startdatum redan har passerat.";
                console.warn(`Admin bekräftade historisk bokning: ${bookingId}`);
            }
        }

        // --- 2. UPPDATERA STATUS I DB ---
        const updatedBooking = await updateBookingStatus(process.env.TABLE_NAME, bookingId, normalizedStatus);

        let results = { calendar: null, email: null };

        switch (normalizedStatus) {
            case "pending":
            case "confirmed":
                // A. Städa bort eventuellt gammalt event först
                if (fullBooking.calendarEventId) {
                    await runIntegration("Delete Old Event", deleteBookingCalendarEvent(fullBooking.calendarEventId));
                }

                const isConfirmed = normalizedStatus === "confirmed";
                const newEvent = await runIntegration(
                    isConfirmed ? "Create Confirmed Event" : "Create Pending Event",
                    createBookingCalendarEvent({
                        ...fullBooking,
                        // Vi lägger till en prefix i titeln så admin ser skillnad direkt
                        name: isConfirmed ? `Bokning: ${fullBooking.name}` : `Förfrågan: ${fullBooking.name}`,
                        calendarId: isConfirmed ? process.env.GOOGLE_PUBLIC_CALENDAR_ID : "primary",
                    }),
                );

                if (newEvent?.id) {
                    await saveCalendarEventId(process.env.TABLE_NAME, bookingId, newEvent.id);
                }

                // C. Skicka bekräftelsemejl ENDAST om den blev confirmed
                if (isConfirmed) {
                    results.email = await runIntegration("Confirm Email", sendBookingConfirmedToGuest({ ...fullBooking }));
                }
                break;

            case "declined":
            case "cancelled":
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
            body: JSON.stringify({ ...updatedBooking, integrations: results, warning }),
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
})
    .use(httpJsonBodyParser())
    .use(validateStatus())
    .use(verifyAdminToken())
    .use(errorHandler());

import middy from "@middy/core";
import { getBookingByIdInternal, updateBookingStatus, saveCalendarEventId } from "../../services/bookingService.mjs";
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
    const normalizedStatus = typeof status === "string" ? status.trim().toLowerCase() : "";
    let calendarUpdated = null;
    let guestEmailSent = null;
    let calendarErrorMessage = null;
    let guestEmailError = null;

    if (!ALLOWED_STATUSES.has(normalizedStatus)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Ogiltig status. Tillåtna värden: pending, confirmed, declined, cancelled",
            }),
        };
    }

    try {
        const fullBooking = await getBookingByIdInternal(process.env.TABLE_NAME, bookingId);

        if (!fullBooking) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Bokning hittades inte" }),
            };
        }

        const updatedBooking = await updateBookingStatus(process.env.TABLE_NAME, bookingId, normalizedStatus);
        switch (normalizedStatus) {
            case "confirmed":
                calendarUpdated = false;
                guestEmailSent = false;

                try {
                    // Skapa event i bastuimpertiet.se-kalender (publik)
                    const calendarEvent = await createBookingCalendarEvent({
                        bookingId: fullBooking.id,
                        name: fullBooking.name,
                        email: fullBooking.email,
                        phone: fullBooking.phone,
                        address: fullBooking.address,
                        postalCode: fullBooking.postalCode,
                        city: fullBooking.city,
                        startDate: fullBooking.startDate,
                        endDate: fullBooking.endDate,
                        cleaning: fullBooking.cleaning,
                        firewood: fullBooking.firewood,
                        scent: fullBooking.scent,
                        delivery: fullBooking.delivery,
                        transportType: fullBooking.transportType,
                        totalPrice: fullBooking.totalPrice,
                        calendarId: process.env.GOOGLE_PUBLIC_CALENDAR_ID,
                    });
                    await saveCalendarEventId(process.env.TABLE_NAME, bookingId, calendarEvent.id);
                    calendarUpdated = true;
                } catch (calendarErr) {
                    console.error("Kunde inte uppdatera Google Calendar:", calendarErr);
                    calendarErrorMessage = calendarErr.message;
                }

                try {
                    await sendBookingConfirmedToGuest({
                        name: fullBooking.name,
                        email: fullBooking.email,
                        startDate: fullBooking.startDate,
                        endDate: fullBooking.endDate,
                        totalPrice: fullBooking.totalPrice,
                    });
                    guestEmailSent = true;
                    console.log("Booking confirmation email sent", {
                        bookingId: fullBooking.id,
                        to: fullBooking.email,
                    });
                } catch (mailError) {
                    console.error("Kunde inte skicka bekräftelsemail till kund:", mailError);
                    guestEmailError = mailError.message;
                }
                break;
            case "declined":
                guestEmailSent = false;

                try {
                    await sendBookingDeclinedToGuest({
                        name: fullBooking.name,
                        email: fullBooking.email,
                        startDate: fullBooking.startDate,
                        endDate: fullBooking.endDate,
                    });
                    guestEmailSent = true;
                    console.log("Booking declined email sent", {
                        bookingId: fullBooking.id,
                        to: fullBooking.email,
                        status: normalizedStatus,
                    });
                } catch (mailError) {
                    console.error("Kunde inte skicka avböjningsmail till kund:", mailError);
                    guestEmailError = mailError.message;
                }
                break;
            case "cancelled":
                guestEmailSent = false;
                calendarUpdated = false;

                // Försök ta bort kalender-event om det finns
                if (fullBooking.calendarEventId) {
                    try {
                        await deleteBookingCalendarEvent(fullBooking.calendarEventId);
                        calendarUpdated = true;
                        console.log("Google Calendar event deleted for booking", bookingId);
                    } catch (calendarErr) {
                        console.error("Kunde inte ta bort kalender-event:", calendarErr);
                        calendarErrorMessage = calendarErr.message;
                    }
                }
                try {
                    await sendBookingCancelledToGuest({
                        name: fullBooking.name,
                        email: fullBooking.email,
                        startDate: fullBooking.startDate,
                        endDate: fullBooking.endDate,
                    });
                    guestEmailSent = true;
                    console.log("Booking cancelled email sent", {
                        bookingId: fullBooking.id,
                        to: fullBooking.email,
                        status: normalizedStatus,
                    });
                } catch (mailError) {
                    console.error("Kunde inte skicka avbokningsmail till kund:", mailError);
                    guestEmailError = mailError.message;
                }
                break;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...updatedBooking,
                integrations: {
                    calendarUpdated,
                    guestEmailSent,
                    calendarError: calendarErrorMessage,
                    guestEmailError,
                },
            }),
        };
    } catch (err) {
        if (err.code === "ConditionalCheckFailedException") {
            return { statusCode: 404, body: JSON.stringify({ message: "Bokning hittades inte" }) };
        }

        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
})
    .use(httpJsonBodyParser())
    .use(validateStatus())
    .use(verifyAdminToken())
    .use(errorHandler());

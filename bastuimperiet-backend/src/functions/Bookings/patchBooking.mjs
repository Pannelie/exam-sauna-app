import { getBookingByIdInternal, updateBookingStatus } from "../../services/bookingService.mjs";
import { createBookingCalendarEvent } from "../../services/googleCalendarService.mjs";
import { sendBookingConfirmedToGuest, sendBookingDeclinedToGuest } from "../../services/mailerService.mjs";

const ALLOWED_STATUSES = new Set(["pending", "confirmed", "declined", "cancelled"]);

export const handler = async (event) => {
    const bookingId = event.pathParameters.id;
    const { status } = JSON.parse(event.body);
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
        const updatedBooking = await updateBookingStatus(process.env.TABLE_NAME, bookingId, normalizedStatus);

        if (normalizedStatus === "confirmed") {
            calendarUpdated = false;
            guestEmailSent = false;
            const fullBooking = await getBookingByIdInternal(process.env.TABLE_NAME, bookingId);

            if (fullBooking) {
                try {
                    await createBookingCalendarEvent({
                        bookingId: fullBooking.id,
                        guestName: fullBooking.guestName,
                        email: fullBooking.email,
                        phone: fullBooking.phone,
                        startDate: fullBooking.startDate,
                        endDate: fullBooking.endDate,
                        totalPrice: fullBooking.totalPrice,
                    });
                    calendarUpdated = true;
                } catch (calendarErr) {
                    console.error("Kunde inte uppdatera Google Calendar:", calendarErr);
                    calendarErrorMessage = calendarErr.message;
                }

                try {
                    await sendBookingConfirmedToGuest({
                        guestName: fullBooking.guestName,
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
            }
        }

        if (normalizedStatus === "declined" || normalizedStatus === "cancelled") {
            guestEmailSent = false;
            const fullBooking = await getBookingByIdInternal(process.env.TABLE_NAME, bookingId);

            if (fullBooking) {
                try {
                    await sendBookingDeclinedToGuest({
                        guestName: fullBooking.guestName,
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
            }
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
};

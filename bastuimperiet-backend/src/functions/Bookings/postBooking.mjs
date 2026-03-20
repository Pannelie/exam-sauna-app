import middy from "@middy/core";
import { postBooking, hasBookingOverlap, getAllBookings, isPastDate, validateBookingRequest } from "../../services/bookingService.mjs";
import { createBookingCalendarEvent } from "../../services/googleCalendarService.mjs";
import { sendNewBookingRequestToAdmin } from "../../services/mailerService.mjs";
import { validateBooking } from "../../middlewares/validateBooking.mjs";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../middlewares/errorHandler.js";
import { runIntegration } from "../../utils/runIntegration.js";
import { saveCalendarEventId } from "../../services/bookingService.mjs";

export const handler = middy(async (event) => {
    try {
        const data = event.body;

        if (!data.name || !data.email || !data.phone || !data.startDate || !data.endDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Saknade obligatoriska fält",
                }),
            };
        }

        const allBookings = await getAllBookings(process.env.TABLE_NAME);

        const validation = validateBookingRequest(data, allBookings);
        if (!validation.isValid) {
            return {
                statusCode: validation.status,
                body: JSON.stringify({ message: validation.message }),
            };
        }

        // 2. Spara i DB (Detta är vår "Single Source of Truth")
        const booking = await postBooking(process.env.TABLE_NAME, data);

        // 3. Integrationer (Mjuka kontroller - vi loggar fel men fortsätter)

        // Skapa Kalender-event (Förfrågan)
        const calendarEvent = await runIntegration(
            "Google Calendar",
            createBookingCalendarEvent({
                ...booking,
                name: `Förfrågan: ${booking.name}`,
                calendarId: process.env.GOOGLE_PRIVATE_CALENDAR_ID,
            }),
        );

        // Spara CalendarEventId i DB om det lyckades
        if (calendarEvent?.id) {
            await runIntegration("Save Calendar ID", saveCalendarEventId(process.env.TABLE_NAME, booking.id, calendarEvent.id));
        }

        // Skicka mail till Admin
        await runIntegration(
            "Admin Email",
            sendNewBookingRequestToAdmin({
                bookingId: booking.id,
                ...booking,
            }),
        );

        return {
            statusCode: 201,
            body: JSON.stringify(booking),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
})
    .use(httpJsonBodyParser())
    .use(validateBooking())
    .use(errorHandler());

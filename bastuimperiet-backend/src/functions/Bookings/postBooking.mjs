import middy from "@middy/core";
import { postBooking, hasBookingOverlap, getAllBookings } from "../../services/bookingService.mjs";
import { validateBooking } from "../../middlewares/validateBooking.mjs";
import { sendNewBookingRequestToAdmin } from "../../services/mailerService.mjs";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../middlewares/errorHandler.js";

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

        // Kolla överlapp
        if (hasBookingOverlap(data.startDate, data.endDate, allBookings)) {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: "Valda datum är redan bokade" }),
            };
        }

        const booking = await postBooking(process.env.TABLE_NAME, data);

        try {
            await sendNewBookingRequestToAdmin({
                bookingId: booking.id,
                ...booking,
            });
            console.log("Admin booking request email sent", {
                bookingId: booking.id,
                to: process.env.ADMIN_EMAIL,
            });
        } catch (mailError) {
            console.error("Kunde inte skicka adminmail för bokningsförfrågan:", mailError);
        }

        return {
            statusCode: 201,
            body: JSON.stringify(booking),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: err.message }),
        };
    }
})
    .use(httpJsonBodyParser())
    .use(validateBooking())
    .use(errorHandler());

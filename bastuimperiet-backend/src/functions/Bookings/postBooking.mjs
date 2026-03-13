import { postBooking, hasBookingOverlap, getAllBookings } from "../../services/bookingService.mjs";
import { sendNewBookingRequestToAdmin } from "../../services/mailerService.mjs";
import { calculateTotalPrice } from "../../utils/calculatePrice.js";

export const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        if (!data.name || !data.email || !data.phone || !data.startDate || !data.endDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Missing required fields",
                }),
            };
        }

        const allBookings = await getAllBookings(process.env.TABLE_NAME);

        // Kolla överlapp
        if (hasBookingOverlap(data.startDate, data.endDate, allBookings)) {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: "Selected dates are already booked" }),
            };
        }
        const totalPrice = await calculateTotalPrice(data.startDate, data.endDate, data.cleaning, data.firewood, data.scent, data.delivery);

        const bookingData = { ...data, totalPrice };
        const booking = await postBooking(process.env.TABLE_NAME, bookingData);

        try {
            await sendNewBookingRequestToAdmin({
                bookingId: booking.id,
                ...bookingData,
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
};

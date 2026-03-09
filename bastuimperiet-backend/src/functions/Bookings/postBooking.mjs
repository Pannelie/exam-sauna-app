import dotenv from "dotenv";
import { postBooking } from "../../services/bookingService.mjs";
import { sendNewBookingRequestToAdmin } from "../../services/mailerService.mjs";

dotenv.config();

export const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const booking = await postBooking(process.env.TABLE_NAME, data);

        try {
            await sendNewBookingRequestToAdmin({
                bookingId: booking.id,
                guestName: data.guestName,
                email: data.email,
                phone: data.phone,
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: booking.totalPrice,
                cleaning: data.cleaning,
                firewood: data.firewood,
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

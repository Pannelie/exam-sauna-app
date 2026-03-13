import { postBooking } from "../../services/bookingService.mjs";
import { sendNewBookingRequestToAdmin } from "../../services/mailerService.mjs";

export const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        if (!data.guestName || !data.email || !data.phone || !data.startDate || !data.endDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Missing required fields",
                }),
            };
        }
        const booking = await postBooking(process.env.TABLE_NAME, data);

        try {
            await sendNewBookingRequestToAdmin({
                bookingId: booking.id,
                guestName: data.guestName,
                email: data.email,
                phone: data.phone,

                address: data.address,
                postalCode: data.postalCode,
                city: data.city,

                startDate: data.startDate,
                endDate: data.endDate,

                cleaning: data.cleaning,
                firewood: data.firewood,
                scent: data.scent,

                delivery: data.delivery,
                transportType: data.transportType,

                totalPrice: booking.totalPrice,
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

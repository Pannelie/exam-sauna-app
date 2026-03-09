import { getAllBookings } from "../../services/bookingService.mjs";

export const handler = async () => {
    try {
        const bookings = await getAllBookings(process.env.TABLE_NAME);
        return { statusCode: 200, body: JSON.stringify(bookings) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
};

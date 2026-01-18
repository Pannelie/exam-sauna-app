import dotenv from "dotenv";
import { updateBookingStatus } from "../../services/bookingService.mjs";

dotenv.config();

export const handler = async (event) => {
    const bookingId = event.pathParameters.id;
    const { status } = JSON.parse(event.body);

    try {
        const updatedBooking = await updateBookingStatus(process.env.TABLE_NAME, bookingId, status);
        return { statusCode: 200, body: JSON.stringify(updatedBooking) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
};

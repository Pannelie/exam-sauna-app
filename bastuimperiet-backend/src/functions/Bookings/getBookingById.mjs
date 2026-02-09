import dotenv from "dotenv";
import { getBookingById } from "../../services/bookingService.mjs";

dotenv.config();

export const handler = async (event) => {
    const bookingId = event.pathParameters.id;

    try {
        const booking = await getBookingById(process.env.TABLE_NAME, bookingId);

        if (!booking) return { statusCode: 404, body: "Bokning hittades inte" };

        return { statusCode: 200, body: JSON.stringify(booking) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
};

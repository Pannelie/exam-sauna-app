import dotenv from "dotenv";
import { postBooking } from "../../services/bookingService.mjs";
import { v4 as uuidv4 } from "uuid"; // för att generera unikt id

dotenv.config();

export const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        // Generera id om inte frontend skickar
        const bookingId = data.id || uuidv4();

        const booking = await postBooking(process.env.TABLE_NAME, {
            ...data,
            id: bookingId,
        });

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

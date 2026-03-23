import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import { getAllBookings } from "../../services/bookingService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    try {
        const status = event.queryStringParameters?.status || null;
        const bookings = await getAllBookings(process.env.TABLE_NAME, status);

        return { statusCode: 200, body: JSON.stringify(bookings) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
})
    .use(verifyAdminToken())
    .use(errorHandler());

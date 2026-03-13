import "dotenv/config";
import middy from "@middy/core";
import { getPrices } from "../../services/priceService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async () => {
    try {
        const prices = await getPrices(process.env.TABLE_NAME);
        return { statusCode: 200, body: JSON.stringify(prices) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
}).use(errorHandler());

import "dotenv/config";
import middy from "@middy/core";
import { getPrices } from "../../services/priceService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async () => {
    try {
        const data = await getPrices();
        console.log("Data retrieved:", data);
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
    }
}).use(errorHandler());

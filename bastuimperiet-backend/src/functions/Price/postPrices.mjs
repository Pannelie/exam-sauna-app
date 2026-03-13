import { calculateTotalPrice } from "../../utils/calculatePrice.js";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        console.log("POST /prices body:", body);

        const { startDate, endDate, cleaning, firewood, scent, delivery } = body;

        const totalPrice = await calculateTotalPrice(startDate, endDate, cleaning, firewood, scent, delivery);
        console.log("Calculated totalPrice:", totalPrice);

        return {
            statusCode: 200,
            body: JSON.stringify({ totalPrice }),
        };
    } catch (err) {
        console.error("POST /prices error:", err);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: err.message }),
        };
    }
};

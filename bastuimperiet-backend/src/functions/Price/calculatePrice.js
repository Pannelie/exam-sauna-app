import { getPrices, calculatePrice } from "../../services/priceService.mjs";

export const handler = async (event) => {
    try {
        // 1. Hämta data från frontenden
        const config = JSON.parse(event.body);

        // 2. Hämta aktuella priser från DynamoDB
        const prices = await getPrices();

        // 3. (Valfritt) Hämta specialdagar från DB
        const specialDays = ["2026-04-18", "2026-06-06"];

        // 4. Räkna ut summan med motorn
        const total = calculatePrice(prices, specialDays, config);

        return {
            statusCode: 200,
            body: JSON.stringify({ total }),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: err.message }),
        };
    }
};

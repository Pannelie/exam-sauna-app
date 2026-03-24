import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb"; // Byt till GetCommand

export async function getPrices() {
    const res = await client.send(
        new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                PK: "CONFIG",
                SK: "PRICES",
            },
        }),
    );

    if (!res.Item) {
        throw new Error("Prislista hittades inte i databasen");
    }

    // Eftersom vi sparade allt i ett objekt i seed-filen:
    // res.Item innehåller nu { priceList: {...}, specialDays: [...] }
    return {
        prices: res.Item.priceList,
        specialDays: res.Item.specialDays || [],
    };
}

export function calculatePrice(prices, specialDays, config) {
    const { startDate, endDate, cleaning, firewood, scent, delivery } = config;

    console.log("Calculating price with config:", config);
    let total = 0;

    // Tillval alltid medräknade
    if (cleaning) total += prices.cleaning;
    total += (firewood || 0) * prices.firewood;
    total += (scent || 0) * prices.scent;
    if (delivery) total += prices.delivery;

    // Datumpriser om giltiga datum finns
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        if (dayCount > 0) {
            let remainingDays = dayCount;
            let current = new Date(start);

            // Lägg till månadspris för varje hel 31-dagarsperiod
            const months = Math.floor(remainingDays / 31);
            if (months > 0) {
                total += months * prices.monthly;
                current.setDate(current.getDate() + months * 31);
                remainingDays -= months * 31;
            }

            // Lägg till veckopris för varje hel vecka
            const weeks = Math.floor(remainingDays / 7);
            if (weeks > 0) {
                total += weeks * prices.weekly;
                current.setDate(current.getDate() + weeks * 7);
                remainingDays -= weeks * 7;
            }

            // Räkna ut pris för återstående dagar
            for (let i = 0; i < remainingDays; i++) {
                const dateStr = current.toISOString().split("T")[0];
                if (specialDays.includes(dateStr)) {
                    total += prices.special;
                } else {
                    const day = current.getDay();
                    total += day === 5 || day === 6 ? prices.weekend : prices.weekday;
                }
                current.setDate(current.getDate() + 1);
            }
        }
    }

    return total;
}

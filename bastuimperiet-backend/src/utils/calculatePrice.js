import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getPrices } from "../services/PriceService.mjs";

// ---------- Specialdagar ----------
const specialDays = ["2026-04-18", "2026-06-06"];

// ---------- Hjälpfunktioner ----------
function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
}

function getDayType(date) {
    const day = date.getDay();
    return day === 5 || day === 6 ? "weekend" : "weekday";
}

// ---------- Beräkna pris per dag ----------
function calculateDayPrice(date, prices) {
    const dateStr = date.toISOString().split("T")[0];
    if (specialDays.includes(dateStr)) return prices.special;
    const type = getDayType(date);
    return prices[type];
}

// ---------- Totalpriskalkyl ----------
export async function calculateTotalPrice(startDateStr, endDateStr, cleaning = false, firewood = 0, scent = 0, delivery = false) {
    const prices = await getPrices();

    const start = parseDate(startDateStr);
    const end = parseDate(endDateStr);

    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    if (dayCount <= 0) throw new Error("Booking must be at least 1 day");

    let totalPrice = 0;

    // Månad
    if (dayCount >= 31) {
        totalPrice += prices.monthly;
    } else {
        const weeks = Math.floor(dayCount / 7);
        const remainingDays = dayCount % 7;

        totalPrice += weeks * prices.weekly;

        for (let i = 0; i < remainingDays; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + weeks * 7 + i);
            totalPrice += calculateDayPrice(currentDate, prices);
        }
    }

    // Tillval
    if (cleaning) totalPrice += prices.cleaning;
    totalPrice += firewood * prices.firewood;
    totalPrice += scent * prices.scent;
    if (delivery) totalPrice += prices.deliveryBase;

    return totalPrice;
}

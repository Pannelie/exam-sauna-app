// Dagtyp: vardag/helg
function getDayType(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay(); // 0 = sön, 6 = lör
    if (day === 5 || day === 6) return "helg"; // fre-lör
    return "vardag"; // sön–tors
}

// Storhelg
const specialDays = ["2026-04-18", "2026-06-06"]; // exempel
function isSpecialDay(dateStr) {
    return specialDays.includes(dateStr);
}

// Pris per dag
function calculateDayPrice(dateStr) {
    if (isSpecialDay(dateStr)) return 950;
    const type = getDayType(dateStr);
    return type === "helg" ? 800 : 600;
}

// Huvudfunktion för totalpris
export function calculateTotalPrice(startDateStr, endDateStr, cleaning = false, firewood = 0) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    let totalPrice = 0;

    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Veckohyra/månadshyra
    if (dayCount >= 31) return 6000 + (cleaning ? 995 : 0) + firewood * 40;
    if (dayCount >= 7) return 2000 + (cleaning ? 995 : 0) + firewood * 40;

    // Pris per dag
    for (let i = 0; i < dayCount; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dateStr = currentDate.toISOString().split("T")[0];
        totalPrice += calculateDayPrice(dateStr);
    }

    if (cleaning) totalPrice += 995;
    if (firewood) totalPrice += firewood * 40;

    return totalPrice;
}

const prices = {
    weekday: 600,
    weekend: 800,
    special: 950,

    weekly: 2000,
    monthly: 6000,

    cleaning: 995,
    firewood: 40,
    scent: 30,

    deliveryBase: 1000,
};

// säkrare datumparser
function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
}

// avgör dagtyp
function getDayType(date) {
    const day = date.getDay();
    return day === 5 || day === 6 ? "weekend" : "weekday";
}

// storhelger
const specialDays = ["2026-04-18", "2026-06-06"];

function isSpecialDay(dateStr) {
    return specialDays.includes(dateStr);
}

// pris per dag
function calculateDayPrice(date) {
    const dateStr = date.toISOString().split("T")[0];

    if (isSpecialDay(dateStr)) {
        return prices.special;
    }

    const type = getDayType(date);
    return prices[type];
}

export function calculateTotalPrice(startDateStr, endDateStr, cleaning = false, firewood = 0, scent = 0, delivery = false) {
    const start = parseDate(startDateStr);
    const end = parseDate(endDateStr);

    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    // stoppa fel bokningar
    if (dayCount <= 0) {
        throw new Error("Booking must be at least 1 day");
    }

    let totalPrice = 0;

    // månad
    if (dayCount >= 31) {
        totalPrice += prices.monthly;
    } else {
        const weeks = Math.floor(dayCount / 7);
        const remainingDays = dayCount % 7;

        totalPrice += weeks * prices.weekly;

        for (let i = 0; i < remainingDays; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + weeks * 7 + i);

            totalPrice += calculateDayPrice(currentDate);
        }
    }

    // tillval
    if (cleaning) totalPrice += prices.cleaning;

    totalPrice += firewood * prices.firewood;
    totalPrice += scent * prices.scent;

    if (delivery) totalPrice += prices.deliveryBase;

    return totalPrice;
}

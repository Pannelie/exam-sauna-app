export function calculatePrice(prices, specialDays, config) {
    const { startDate, endDate, cleaning, firewood, scent, delivery } = config;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    if (dayCount <= 0) return 0;

    let total = 0;

    // Logik för månader/veckor/dagar
    if (dayCount >= 31) {
        total += prices.monthly;
    } else {
        const weeks = Math.floor(dayCount / 7);
        const remainingDays = dayCount % 7;
        total += weeks * prices.weekly;

        for (let i = 0; i < remainingDays; i++) {
            const current = new Date(start);
            current.setDate(current.getDate() + weeks * 7 + i);
            const dateStr = current.toISOString().split("T")[0];

            if (specialDays.includes(dateStr)) {
                total += prices.special;
            } else {
                const day = current.getDay();
                total += day === 5 || day === 6 ? prices.weekend : prices.weekday;
            }
        }
    }

    // Tillval
    if (cleaning) total += prices.cleaning;
    total += (firewood || 0) * prices.firewood;
    total += (scent || 0) * prices.scent;
    if (delivery) total += prices.delivery;

    return total;
}

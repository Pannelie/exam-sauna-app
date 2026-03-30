export function formatBookingForFrontend(item) {
    return {
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,

        address: item.address,
        postalCode: item.postalCode,
        city: item.city,

        startDate: item.startDate,
        endDate: item.endDate,

        cleaning: item.cleaning,
        firewood: item.firewood,
        scent: item.scent,

        delivery: item.delivery,
        transportType: item.transportType,

        totalPrice: item.totalPrice,
        status: item.status,
    };
}

export function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
        .toLocaleString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        .replace(",", " kl.");
}

export function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

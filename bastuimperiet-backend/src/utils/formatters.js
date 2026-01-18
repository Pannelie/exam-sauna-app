export function formatBookingForFrontend(item) {
    return {
        id: item.id,
        guestName: item.guestName,
        startDate: item.startDate,
        endDate: item.endDate,
        status: item.status,
        totalPrice: item.totalPrice,
        cleaning: item.cleaning,
        firewood: item.firewood,
    };
}

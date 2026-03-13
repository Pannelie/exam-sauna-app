export function formatBookingForFrontend(item) {
    return {
        id: item.id,
        guestName: item.guestName,
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

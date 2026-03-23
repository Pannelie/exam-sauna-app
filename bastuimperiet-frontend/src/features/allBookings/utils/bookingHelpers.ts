import type { ApiBookingData } from "../../../types/bookingTypes";
import { BookingStatus } from "../../../types/bookingTypes";

export const filterBookingsByTab = (bookings: ApiBookingData[], tabIndex: number) => {
    switch (tabIndex) {
        case 0: // Nya
            return bookings.filter((b) => b.status === "pending");
        case 1: // Bekräftade
            return bookings.filter((b) => b.status === "confirmed");
        case 2: // Nekade
            return bookings.filter((b) => b.status === "declined");
        case 3: // Avbokade
            return bookings.filter((b) => b.status === "cancelled");
        default:
            return bookings;
    }
};

export const getStatusColor = ({ booking }: { booking: ApiBookingData }) => {
    if (booking.status === "confirmed") return "#4CAF50";
    if (booking.status === "pending") return "#FFC107";
    if (booking.status === "cancelled") return "#D32F2F";
    if (booking.status === "declined") return "#F44336";
    return "#e0e0e0";
};

export const getStatusText = ({ booking }: { booking: ApiBookingData }) => {
    if (booking.status === BookingStatus.Confirmed) return "Bekräftad";
    if (booking.status === BookingStatus.Cancelled) return "Avbokad";
    if (booking.status === BookingStatus.Declined) return "Nekad";
    return "Okänd";
};

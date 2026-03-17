import type { ApiBookingData } from "../../../types/bookingTypes";
import { BookingStatus } from "../../../types/bookingTypes";

export const filterBookingsByTab = (bookings: ApiBookingData[], tabIndex: number) => {
    switch (tabIndex) {
        case 1:
            return bookings.filter((b) => b.status === BookingStatus.Pending);
        case 2:
            return bookings.filter((b) => b.status === BookingStatus.Confirmed);
        case 3:
            return bookings.filter((b) => b.status === BookingStatus.Declined);
        case 4:
            return bookings.filter((b) => b.status === BookingStatus.Cancelled);
        default:
            return bookings;
    }
};

export const getStatusColor = ({ booking }: { booking: ApiBookingData }) => {
    if (booking.status === BookingStatus.Confirmed) return "#4CAF50";
    if (booking.status === BookingStatus.Pending) return "#FFC107";
    if (booking.status === BookingStatus.Cancelled) return "#D32F2F";
    if (booking.status === BookingStatus.Declined) return "#F44336";
    return "#e0e0e0";
};

export const getStatusText = ({ booking }: { booking: ApiBookingData }) => {
    if (booking.status === BookingStatus.Confirmed) return "Bekräftad";
    if (booking.status === BookingStatus.Cancelled) return "Avbokad";
    if (booking.status === BookingStatus.Declined) return "Nekad";
    return "Okänd";
};

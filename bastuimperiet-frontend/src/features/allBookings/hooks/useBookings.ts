import { useState } from "react";
import { useEffect, useMemo } from "react";
import { useBookingListStore } from "../../../stores/useBookingListStore";
// import { useCalendar } from "../../calendar/hooks/useCalendar";

export function useBookings() {
    // Global data från Zustand
    const { bookings, loading, selectedBooking, setSelectedBooking, fetchBookings } = useBookingListStore();
    // const { refreshCalendar } = useCalendar();
    // Lokal UI-state (behålls här!)
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const statusMap = useMemo(() => ["pending", "confirmed", "declined", "cancelled", null], []);
    const currentStatus = statusMap[tabIndex];

    // 1. Vanlig fetch när vi byter flik (visar loading)
    useEffect(() => {
        fetchBookings(currentStatus);
    }, [currentStatus, fetchBookings]);

    useEffect(() => {
        const interval = setInterval(async () => {
            // Här tvingar vi den att använda flikens status!
            await fetchBookings(currentStatus, true);
        }, 60000);

        return () => clearInterval(interval);
    }, [currentStatus, fetchBookings]);

    // Söklogiken stannar här
    const filteredBookings = useMemo(() => {
        if (!searchTerm) return bookings;
        return bookings.filter(
            (b) => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [bookings, searchTerm]);

    return {
        bookings,
        loading,
        tabIndex,
        setTabIndex,
        searchTerm,
        setSearchTerm,
        filteredBookings,
        refreshData: fetchBookings,
        selectedBooking,
        setSelectedBooking,
    };
}

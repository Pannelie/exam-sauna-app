import { useState } from "react";
import type { ApiBookingData } from "../../../types/bookingTypes";
import { useEffect, useMemo } from "react";
import { getAllBookings } from "../services/allBookingsService";
import { filterBookingsByTab } from "../utils/bookingHelpers";

export function useBookings() {
    const [bookings, setBookings] = useState<ApiBookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data);
            } catch (error) {
                console.error("Misslyckades:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const filteredBookings = useMemo(() => {
        const tabFiltered = filterBookingsByTab(bookings, tabIndex);
        if (!searchTerm) return tabFiltered;
        return tabFiltered.filter(
            (b) => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [bookings, tabIndex, searchTerm]);

    return { bookings, loading, tabIndex, setTabIndex, searchTerm, setSearchTerm, filteredBookings };
}

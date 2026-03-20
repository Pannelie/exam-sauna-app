import { useState, useEffect } from "react";
import { getCalendarEvents } from "../services/calendarService";

export const useCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [hoveredBookingId, setHoveredBookingId] = useState<string | null>(null);

    const fetchEvents = async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
            const data = await getCalendarEvents();
            setEvents(data);
        } catch (err) {
            console.error("Kunde inte hämta kalenderdata:", err);
        } finally {
            setLoading(false);
        }
    };

    // Alias för tydlighet när du anropar den utifrån
    const refreshCalendar = () => fetchEvents(false);

    useEffect(() => {
        fetchEvents(true); // Kör med loading-spinner första gången
    }, []);

    return {
        events,
        loading,
        refreshCalendar,
        clickedId,
        setClickedId,
        hoveredBookingId,
        setHoveredBookingId,
    };
};

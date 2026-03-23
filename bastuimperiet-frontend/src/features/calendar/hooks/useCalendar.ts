import { useState, useEffect, useRef } from "react";
import { useBookingListStore } from "../../../stores/useBookingListStore";
import { getCalendarEvents } from "../services/calendarService";
import type { EventType } from "../services/calendarService";

export function useCalendar() {
    const [events, setEvents] = useState<EventType[]>([]);
    const prevEventsRef = useRef<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [hoveredBookingId, setHoveredBookingId] = useState<string | null>(null);

    const areEventsEqual = (a: EventType[], b: EventType[]): boolean => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
        }
        return true;
    };

    const fetchEvents = async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
            const data = await getCalendarEvents();
            // Endast uppdatera events om det faktiskt är skillnad
            if (!areEventsEqual(data, prevEventsRef.current)) {
                setEvents(data);
                prevEventsRef.current = data;
            }
        } catch (err: any) {
            console.error("Kunde inte hämta kalenderdata:", err.message);
        } finally {
            setLoading(false);
        }
    };

    // Alias för tydlighet när du anropar den utifrån
    const refreshCalendar = () => fetchEvents(false);

    // Kör första gången och när bokningslistan ändras (lastUpdated)
    const lastUpdated = useBookingListStore((state) => state.lastUpdated);
    useEffect(() => {
        fetchEvents(true);
    }, [lastUpdated]);

    return {
        events,
        loading,
        refreshCalendar,
        clickedId,
        setClickedId,
        hoveredBookingId,
        setHoveredBookingId,
    };
}

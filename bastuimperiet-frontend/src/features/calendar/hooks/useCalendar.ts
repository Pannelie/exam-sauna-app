import { useEffect, useRef } from "react";
import { useBookingListStore } from "../../../stores/useBookingListStore";
import { useCalendarStore } from "../../../stores/useCalendarStore";
import { getCalendarEvents } from "../services/calendarService";
import type { EventType } from "../services/calendarService";

export function useCalendar() {
    const events = useCalendarStore((state) => state.events);
    const loading = useCalendarStore((state) => state.loading);
    const setEvents = useCalendarStore((state) => state.setEvents);
    const setLoading = useCalendarStore((state) => state.setLoading);
    const lastFetched = useCalendarStore((state) => state.lastFetched);
    const setLastFetched = useCalendarStore((state) => state.setLastFetched);
    const clearEvents = useCalendarStore((state) => state.clearEvents);
    const clickedId = useCalendarStore((state) => state.clickedId);
    const setClickedId = useCalendarStore((state) => state.setClickedId);
    const hoveredBookingId = useCalendarStore((state) => state.hoveredBookingId);
    const setHoveredBookingId = useCalendarStore((state) => state.setHoveredBookingId);
    const prevEventsRef = useRef<EventType[]>([]);
    const isFetchingRef = useRef(false);

    // Jämförelsefunktion för events
    const areEventsEqual = (a: EventType[], b: EventType[]): boolean => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
        }
        return true;
    };

    // Hämta events om de saknas eller om bokningslistan ändrats
    const lastUpdated = useBookingListStore((state) => state.lastUpdated);
    useEffect(() => {
        const fetchEvents = async () => {
            if (isFetchingRef.current) return;
            isFetchingRef.current = true;
            setLoading(true);
            try {
                const data = await getCalendarEvents();
                if (!areEventsEqual(data, prevEventsRef.current)) {
                    setEvents(data);
                    prevEventsRef.current = data;
                }
                setLastFetched(Date.now());
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Kunde inte hämta kalenderdata:", err.message);
                } else {
                    console.error("Kunde inte hämta kalenderdata");
                }
            } finally {
                isFetchingRef.current = false;
                setLoading(false);
            }
        };
        // Hämta första gången och vid uppdaterad bokningslista.
        // En tom array (inga events) ska inte trigga ny hämtning i loop.
        if (!lastFetched || lastUpdated > lastFetched) {
            fetchEvents();
        }
    }, [lastUpdated, lastFetched, setEvents, setLoading, setLastFetched]);

    // Manuell refresh-funktion
    const refreshCalendar = () => {
        clearEvents();
        setLastFetched(null);
    };

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

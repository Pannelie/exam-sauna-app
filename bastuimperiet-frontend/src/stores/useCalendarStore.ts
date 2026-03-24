import { create } from "zustand";
import type { EventType } from "../features/calendar/services/calendarService";

interface CalendarState {
    events: EventType[];
    loading: boolean;
    lastFetched: number | null;
    clickedId: string | null;
    hoveredBookingId: string | null;
    setEvents: (events: EventType[]) => void;
    setLoading: (loading: boolean) => void;
    setLastFetched: (timestamp: number | null) => void;
    clearEvents: () => void;
    setClickedId: (id: string | null) => void;
    setHoveredBookingId: (id: string | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    loading: false,
    lastFetched: null,
    clickedId: null,
    hoveredBookingId: null,
    setEvents: (events) => set({ events }),
    setLoading: (loading) => set({ loading }),
    setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
    clearEvents: () => set({ events: [], lastFetched: null }),
    setClickedId: (id) => set({ clickedId: id }),
    setHoveredBookingId: (id) => set({ hoveredBookingId: id }),
}));

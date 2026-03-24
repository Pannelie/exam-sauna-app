// src/store/useBookingListStore.ts
import { create } from "zustand";
import { getAllBookings } from "../features/allBookings/services/allBookingsService";
import type { ApiBookingData } from "../types/bookingTypes";
import { BookingStatus } from "../types/bookingTypes";
import { getBookingById } from "../features/allBookings/services/allBookingsService";

interface BookingListState {
    bookings: ApiBookingData[];
    selectedBooking: ApiBookingData | null;
    loading: boolean;
    error: string | null;
    lastUpdated: number; // timestamp för att signalera ändring
    fetchBookings: (status?: string | null, isSilent?: boolean) => Promise<void>;
    fetchBookingById: (id: string) => Promise<void>;
    updateBookingStatusInList: (id: string, newStatus: BookingStatus) => void;
    setSelectedBooking: (booking: ApiBookingData | null) => void;
}

export const useBookingListStore = create<BookingListState>((set, get) => ({
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
    lastUpdated: Date.now(),

    fetchBookings: async (status: string | null = null, isSilent = false) => {
        if (!isSilent) set({ loading: true });
        try {
            const data = await getAllBookings(status ?? undefined);
            const prev = get().bookings;
            // Jämför bokningsdata, om ändrad: uppdatera lastUpdated, annars inte
            const isSame = prev.length === data.length && prev.every((b, i) => JSON.stringify(b) === JSON.stringify(data[i]));
            if (!isSame) {
                set({ bookings: data, loading: false, lastUpdated: Date.now() });
            } else {
                set({ bookings: data, loading: false });
            }
        } catch (error) {
            set({ error: "Fel vid hämtning", loading: false });
        }
    },
    fetchBookingById: async (id: string) => {
        const existing = get().bookings.find((b) => String(b.id) === id);
        if (existing) {
            set({ selectedBooking: existing });
            return;
        }
        set({ loading: true, error: null });
        try {
            const data = await getBookingById(id);
            set({ selectedBooking: data, loading: false });
        } catch (error) {
            console.error("Kunde inte hämta specifik bokning:", error);
            set({ error: "Bokningen hittades inte", loading: false });
        }
    },
    updateBookingStatusInList: (id, newStatus) => {
        set((state) => ({
            bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
            selectedBooking: state.selectedBooking?.id === id ? { ...state.selectedBooking, status: newStatus } : state.selectedBooking,
            lastUpdated: Date.now(),
        }));
    },
    setSelectedBooking: (booking) => set({ selectedBooking: booking }),
}));

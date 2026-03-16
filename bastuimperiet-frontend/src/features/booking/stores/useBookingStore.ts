import { create } from "zustand";
import { getPriceList } from "../services/priceService";
import type { BookingState } from "../types/bookingTypes";
import { calculatePrice } from "../utils/priceEngine";

export const useBookingStore = create<BookingState>((set, get) => ({
    // State
    startDate: undefined,
    endDate: undefined,
    cleaning: false,
    firewood: 0,
    scent: 0,
    delivery: false,
    totalPrice: 0,
    isLoading: false,
    error: null,
    prices: null,
    specialDays: [],

    fetchPrices: async () => {
        if (get().prices) return;

        set({ isLoading: true, error: null });
        try {
            const data = await getPriceList();
            // Vi antar att getPriceList returnerar { prices, specialDays }
            set({
                prices: data.prices,
                specialDays: data.specialDays || [],
                isLoading: false,
            });
            get().calculateTotal();
        } catch (error) {
            set({ error: "Kunde inte hämta prislista", isLoading: false });
        }
    },

    // Public action: Används av dina inputs
    setField: (field, value) => {
        set((state) => ({ ...state, [field]: value }));
        get().calculateTotal();
    },

    // Intern action: Sköter debounce och API-anrop
    calculateTotal: () => {
        const state = get();

        // Om prislistan inte landat än kan vi inte räkna
        if (!state.prices) return;

        // Kolla om vi har något att räkna på
        const hasAnyValue = state.startDate || state.endDate || state.firewood > 0 || state.scent > 0 || state.cleaning || state.delivery;

        if (!hasAnyValue) {
            set({ totalPrice: 0 });
            return;
        }

        try {
            // Använd din synkade engine!
            // Vi mappar state till det format calculatePrice förväntar sig (config)
            const total = calculatePrice(state.prices, state.specialDays, {
                startDate: state.startDate,
                endDate: state.endDate,
                cleaning: state.cleaning,
                firewood: state.firewood,
                scent: state.scent,
                delivery: state.delivery,
            });

            set({ totalPrice: total, error: null });
        } catch (error) {
            console.error("Lokal prisberäkning misslyckades:", error);
            set({ error: "Fel vid prisberäkning" });
        }
    },

    reset: () =>
        set({
            startDate: undefined,
            endDate: undefined,
            cleaning: false,
            firewood: 0,
            scent: 0,
            delivery: false,
            totalPrice: 0,
            isLoading: false,
            error: null,
        }),
}));

// src/stores/bookingStore.ts
import { create } from "zustand";
import type { BookingState, BookingBase } from "../types/bookingTypes";
import { calculateTotalPrice } from "../utils/calculatePrice";
import { postPrice } from "../services/priceService";

export const useBookingStore = create<BookingState>((set, get) => ({
    // --- Booking data ---
    startDate: undefined,
    endDate: undefined,
    cleaning: false,
    firewood: 0,
    scent: 0,
    delivery: false,
    transportType: undefined,
    totalPrice: 0,

    // --- Uppdatera fält ---
    setField: (field, value) => {
        set({ [field]: value });

        // --- Lokal prisberäkning för UI ---
        const { startDate, endDate, cleaning, firewood, scent, delivery, transportType } = get();
        if (startDate && endDate) {
            const totalPrice = calculateTotalPrice(startDate, endDate, cleaning, firewood, scent, delivery, transportType);
            set({ totalPrice });
        } else {
            set({ totalPrice: 0 });
        }
    },

    // --- Backend-pris för validering ---
    fetchPriceFromBackend: async () => {
        const { startDate, endDate, cleaning, firewood, scent, delivery, transportType } = get();
        if (!startDate || !endDate) return 0;

        const bookingData: BookingBase = {
            startDate,
            endDate,
            cleaning,
            firewood,
            scent,
            delivery,
            transportType,
        };

        try {
            const backendPrice = await postPrice(bookingData);
            set({ totalPrice: backendPrice });
            return backendPrice;
        } catch (err) {
            console.error("Fel vid backend-pris:", err);
            return 0;
        }
    },
}));

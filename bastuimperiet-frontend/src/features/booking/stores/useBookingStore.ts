import { create } from "zustand";
import type { BookingState } from "../types/bookingTypes";
import { getPrice } from "../services/priceService";

interface BookingStore extends BookingState {
    setField: <K extends keyof BookingState>(field: K, value: BookingState[K]) => void;
    calculateTotalPrice: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    startDate: "",
    endDate: "",
    cleaning: false,
    firewood: 0,
    scent: 0,
    delivery: false,
    totalPrice: 0,

    setField: (field, value) => {
        set({ [field]: value } as any); // uppdatera fältet
        get().calculateTotalPrice(); // räkna om priset automatiskt
    },

    calculateTotalPrice: async () => {
        const state = get();
        // Kolla att datum är satta
        if (!state.startDate || !state.endDate) {
            set({ totalPrice: 0 });
            return;
        }

        try {
            const price = await getPrice({
                startDate: state.startDate,
                endDate: state.endDate,
                cleaning: state.cleaning,
                firewood: state.firewood,
                scent: state.scent,
                delivery: state.delivery,
            });
            set({ totalPrice: price });
        } catch (err) {
            console.error("Kunde inte uppdatera priset:", err);
            set({ totalPrice: 0 });
        }
    },
}));

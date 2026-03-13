import { create } from "zustand";
import { getPricePreview } from "../services/priceService";
import type { BookingBase, BookingState } from "../types/bookingTypes";

// ... samma imports som innan
let priceDebounceTimer: ReturnType<typeof setTimeout>;

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
    // Public action: Används av dina inputs
    setField: (field, value) => {
        set((state) => ({ ...state, [field]: value }));

        // Varje gång ett fält ändras, triggar vi den interna kalkylatorn
        get().calculateTotal();
    },

    // Intern action: Sköter debounce och API-anrop
    calculateTotal: async () => {
        const state = get();

        // 1. Snabbkoll: Har vi datum? Om inte, nollställ priset och avbryt.
        if (!state.startDate || !state.endDate) {
            set({ totalPrice: 0 });
            return;
        }

        // 2. Debounce: Rensa tidigare timer
        clearTimeout(priceDebounceTimer);

        // 3. Starta timer för anrop
        priceDebounceTimer = setTimeout(async () => {
            set({ isLoading: true });

            try {
                // Vi skickar nuvarande state som bas för beräkningen
                const total = await getPricePreview(get() as BookingBase);
                set({ totalPrice: total });
            } catch (error) {
                console.error("Prisberäkningsfel:", error);
            } finally {
                set({ isLoading: false });
            }
        }, 400);
    },
}));

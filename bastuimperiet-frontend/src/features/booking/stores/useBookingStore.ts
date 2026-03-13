import { create } from "zustand";
import type { BookingState } from "../types/bookingTypes";
import { getPrice } from "../services/priceService";

// ---------- Specialdagar ----------
const specialDays = ["2026-04-18", "2026-06-06"];

// ---------- Hjälpfunktioner ----------
function parseDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
}

function getDayType(date: Date) {
    const day = date.getDay();
    return day === 5 || day === 6 ? "weekend" : "weekday";
}

function calculateDayPrice(date: Date, prices: any) {
    const dateStr = date.toISOString().split("T")[0];
    if (specialDays.includes(dateStr)) return prices.special;
    const type = getDayType(date);
    return prices[type];
}

// ---------- Store ----------
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
        set({ [field]: value } as any);
        get().calculateTotalPrice(); // räkna om priset automatiskt
    },

    calculateTotalPrice: async () => {
        const state = get();

        if (!state.startDate || !state.endDate) {
            set({ totalPrice: 0 });
            return;
        }

        try {
            const prices = await getPrice();

            const start = parseDate(state.startDate);
            const end = parseDate(state.endDate);
            const dayCount = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            if (dayCount <= 0) {
                set({ totalPrice: 0 });
                return;
            }

            let total = 0;

            // Månad eller veckor + dagar
            if (dayCount >= 31) {
                total += prices.monthly;
            } else {
                const weeks = Math.floor(dayCount / 7);
                const remainingDays = dayCount % 7;

                total += weeks * prices.weekly;

                for (let i = 0; i < remainingDays; i++) {
                    const currentDate = new Date(start);
                    currentDate.setDate(currentDate.getDate() + weeks * 7 + i);
                    total += calculateDayPrice(currentDate, prices);
                }
            }

            // Tillval
            if (state.cleaning) total += prices.cleaning;
            total += state.firewood * prices.firewood;
            total += state.scent * prices.scent;
            if (state.delivery) total += prices.delivery; // kolla att det är rätt nyckel från API:t

            set({ totalPrice: total });
        } catch (err) {
            console.error("Kunde inte uppdatera priset:", err);
            set({ totalPrice: 0 });
        }
    },
}));

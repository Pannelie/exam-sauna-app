import type { PriceList, BookingBase } from "../../types/bookingTypes";

export function calculatePrice(prices: PriceList, specialDays: string[], config: BookingBase): number;

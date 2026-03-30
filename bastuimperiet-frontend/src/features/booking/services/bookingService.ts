import axios from "axios";
import type { ApiBookingData, BookingFormData } from "../../../types/bookingTypes";

type ValidateStepResult = { success: true; data: unknown } | { success: false; errors: Record<string, string>; status?: number };

const baseUrl = import.meta.env.VITE_API_URL;

export const postBooking = async (bookingData: BookingFormData): Promise<ApiBookingData> => {
    try {
        console.log("Skickar bokning till backend:", JSON.stringify(bookingData, null, 2));
        const response = await axios.post<ApiBookingData>(`${baseUrl}/bookings`, bookingData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Bokning skapad:", response.data);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Kunde inte skapa bokning:", err.response?.data || err.message);
            throw err;
        }

        throw new Error("Något gick fel vid skapande av bokning");
    }
};

export const validateBookingService = {
    validateStep: async (step: number, formData: BookingFormData): Promise<ValidateStepResult> => {
        try {
            const response = await axios.post(`${baseUrl}/bookings/validate`, {
                step,
                data: formData,
            });

            return {
                success: true,
                data: response.data,
            };
        } catch (err: unknown) {
            const axiosErr = axios.isAxiosError<{ errors?: Record<string, string> }>(err) ? err : null;
            return {
                success: false,
                errors: axiosErr?.response?.data?.errors || { general: "Ett oväntat fel uppstod" },
                status: axiosErr?.response?.status,
            };
        }
    },
};

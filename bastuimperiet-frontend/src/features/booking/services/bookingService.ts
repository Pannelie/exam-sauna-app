import axios from "axios";
import type { ApiBookingData, BookingFormData } from "../../../types/bookingTypes";

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
    } catch (err: any) {
        console.error("Kunde inte skapa bokning:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Något gick fel vid skapande av bokning");
    }
};

export const validateBookingService = {
    validateStep: async (step: number, formData: BookingFormData) => {
        try {
            const response = await axios.post(`${baseUrl}/bookings/validate`, {
                step,
                data: formData,
            });

            return {
                success: true,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                errors: err.response?.data?.errors || { general: "Ett oväntat fel uppstod" },
                status: err.response?.status,
            };
        }
    },
};

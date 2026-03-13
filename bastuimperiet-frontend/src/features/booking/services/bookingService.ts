import axios from "axios";
import type { ApiBookingData, BookingFormData } from "../types/bookingTypes";

const baseUrl = "https://vfmzqfunsg.execute-api.eu-north-1.amazonaws.com/bookings";

export const postBooking = async (bookingData: BookingFormData): Promise<ApiBookingData> => {
    try {
        console.log("Skickar bokning till backend:", JSON.stringify(bookingData, null, 2));
        const response = await axios.post<ApiBookingData>(baseUrl, bookingData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Bokning skapad:", response.data);
        return response.data;
    } catch (err: any) {
        // Förbättrad felhantering
        console.error("Kunde inte skapa bokning:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Något gick fel vid skapande av bokning");
    }
};

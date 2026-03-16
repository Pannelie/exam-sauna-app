import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
import type { ApiBookingData } from "../../../types/bookingTypes";

export const getAllBookings = async (): Promise<ApiBookingData[]> => {
    const token = localStorage.getItem("adminToken");
    try {
        const response = await axios.get(`${baseUrl}/bookings`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data: ApiBookingData[] = response.data;
        console.log("Hämtade bokningar:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
import type { ApiBookingData } from "../../../types/bookingTypes";
import { BookingStatus } from "../../../types/bookingTypes";

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
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateBookingStatus = async (id: string, status: BookingStatus, force: boolean = false) => {
    const token = localStorage.getItem("adminToken");
    console.log(`Uppdaterar bokning ${id} till status: ${status}${force ? " (force)" : ""}`);
    try {
        const response = await axios.patch(
            `${baseUrl}/bookings/${id}`,
            { status, ...(force ? { force: true } : {}) },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(`Kunde inte uppdatera bokning ${id} till status: ${status}`, error);
        throw error;
    }
};

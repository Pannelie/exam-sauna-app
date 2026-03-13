import axios from "axios";
import type { ApiBookingData } from "../types/bookingTypes";

export const postBooking = async () => {
    const response = await axios.post("/api/bookings", {});
    return response.data as ApiBookingData;
};

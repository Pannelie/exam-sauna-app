import axios from "axios";
import type { BookingPriceData } from "../types/bookingTypes";

const baseUrl = "https://vfmzqfunsg.execute-api.eu-north-1.amazonaws.com/prices";

export const getPrice = async (bookingData: BookingPriceData): Promise<number> => {
    try {
        console.log("Beräknar pris med backend:", bookingData);

        const response = await axios.get<{ totalPrice: number }>(baseUrl, {
            params: bookingData,
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Pris mottaget från backend:", response.data.totalPrice);
        return response.data.totalPrice;
    } catch (err: any) {
        console.error("Kunde inte beräkna pris:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Något gick fel vid prisberäkning");
    }
};

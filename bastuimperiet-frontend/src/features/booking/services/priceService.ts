import axios from "axios";
import type { BookingBase } from "../types/bookingTypes";

const baseUrl = "https://vfmzqfunsg.execute-api.eu-north-1.amazonaws.com/prices";

/**
 * Hämtar den allmänna prislistan (t.ex. för att visa "Ved: 40kr" i UI)
 */
export const getPriceList = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (err: any) {
        console.error("Kunde inte hämta prislistan:", err.message);
        throw err;
    }
};

/**
 * Skickar användarens val till backend för att få en exakt uträkning
 */
export const getPricePreview = async (bookingData: BookingBase): Promise<number> => {
    // Säkerhetskoll: Om datum saknas, returnera 0 direkt utan API-anrop
    if (!bookingData.startDate || !bookingData.endDate) {
        return 0;
    }

    try {
        // Vi skapar en kopia där vi garanterar att datumen är strängar
        const payload = {
            ...bookingData,
            startDate: bookingData.startDate,
            endDate: bookingData.endDate,
        };

        const response = await axios.post<{ total: number }>(`${baseUrl}/calculate`, payload);
        return response.data.total;
    } catch (err: any) {
        throw new Error("Kunde inte beräkna pris");
    }
};

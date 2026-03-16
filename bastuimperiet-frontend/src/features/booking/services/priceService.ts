import axios from "axios";
// import type { BookingPriceData } from "../types/bookingTypes";

const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Hämtar den allmänna prislistan (t.ex. för att visa "Ved: 40kr" i UI)
 */
export const getPriceList = async () => {
    try {
        const response = await axios.get(`${baseUrl}/prices`);
        console.log("Prislista hämtad:", response.data);
        return response.data;
    } catch (err: any) {
        console.error("Kunde inte hämta prislistan:", err.message);
        throw err;
    }
};

/**
 * Skickar användarens val till backend för att få en exakt uträkning
 */
// export const getPricePreview = async (bookingData: BookingPriceData): Promise<number> => {
//     try {
//         // Vi skapar en kopia där vi garanterar att datumen är strängar
//         const payload = {
//             ...bookingData,
//             startDate: bookingData.startDate || null,
//             endDate: bookingData.endDate || null,
//         };

//         const response = await axios.post<{ total: number }>(`${baseUrl}/calculate`, payload);
//         return response.data.total;
//     } catch (err: any) {
//         throw new Error("Kunde inte beräkna pris");
//     }
// };

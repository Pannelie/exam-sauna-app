import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

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

import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getCalendarEvents = async () => {
    try {
        const response = await axios.get(`${baseUrl}/calendar/events`);
        return response.data;
    } catch (err: any) {
        console.error("Kunde inte hämta kalenderhändelser:", err.message);
        throw err;
    }
};

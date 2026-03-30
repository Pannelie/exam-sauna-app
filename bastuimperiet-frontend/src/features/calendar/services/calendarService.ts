import axios from "axios";

export interface EventType {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    [key: string]: unknown;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const getCalendarEvents = async (): Promise<EventType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/calendar/events`);
        return response.data as EventType[];
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Kunde inte hämta kalenderhändelser:", err.message);
        } else {
            console.error("Kunde inte hämta kalenderhändelser");
        }
        throw err;
    }
};

import axios from "axios";

export interface EventType {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    [key: string]: any;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const getCalendarEvents = async (): Promise<EventType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/calendar/events`);
        return response.data as EventType[];
    } catch (err: any) {
        console.error("Kunde inte hämta kalenderhändelser:", err.message);
        throw err;
    }
};

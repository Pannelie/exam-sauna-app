import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, useTheme } from "@mui/material";
import { getCalendarEvents } from "../services/calendarService";
import { useState, useEffect } from "react";

export const GoogleCalendar = () => {
    const theme = useTheme();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await getCalendarEvents();
                setEvents(data);
            } catch (err) {
                console.error("Kunde inte hämta kalenderhändelser:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div style={{ height: "100%" }}>
            {loading ? (
                <p>Laddar kalender...</p>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale="sv"
                    events={events} // Här skickar vi in datan från Axios
                    height="100%"
                />
            )}
        </div>
    );
};

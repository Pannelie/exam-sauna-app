import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Bra att ha för klick
import type { EventContentArg } from "@fullcalendar/core";
import { getCalendarEvents } from "../services/calendarService";
import { useState, useEffect } from "react";
import "./googleCalendar.css"; // Vi skapar denna fil nedan

export const GoogleCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await getCalendarEvents();
                console.log("Hämtade kalenderhändelser:", data[0]);
                setEvents(data);
            } catch (err) {
                console.error("Kunde inte hämta kalenderhändelser:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Custom renderare för händelser för att slippa den tråkiga standard-dotten
    const renderEventContent = (eventInfo: EventContentArg) => {
        const title = eventInfo.event.title || "";

        // Logga titeln för att se att "Bastu-bokning" faktiskt finns där
        console.log("Hittade titel:", title);

        // Om titeln innehåller "FÖRFRÅGAN" är den pending (grå)
        // Om den innehåller "Bastu-bokning" är den confirmed (grön)
        const isPending = title.includes("FÖRFRÅGAN");
        const isConfirmed = title.includes("Bastu-bokning");

        // Skapa klass-strängen
        let statusClass = "is-neutral"; // Standard
        if (isPending) statusClass = "is-pending";
        if (isConfirmed) statusClass = "is-confirmed";

        return (
            <div className={`custom-event-card ${statusClass}`}>
                <span className="event-time">{eventInfo.timeText}</span>
                <b className="event-title">{title.replace("FÖRFRÅGAN: ", "").replace("Bastu-bokning: ", "")}</b>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            {loading ? (
                <div className="loader">Laddar kalender...</div>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="sv"
                    events={events}
                    height="auto"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek",
                    }}
                    buttonText={{
                        today: "Idag",
                        month: "Månad",
                        week: "Vecka",
                    }}
                    eventContent={renderEventContent}
                    eventDisplay="block" // Gör att händelserna ser ut som kort
                />
            )}
        </div>
    );
};

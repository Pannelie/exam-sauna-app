import { useEffect, useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";
import { useNavigate } from "react-router-dom";
import "./googleCalendar.css";

// 1. Flytta ut denna. Notera att vi lägger till id-klassen här så vi kan hitta elementet senare.
const renderEventContent = (eventInfo: EventContentArg) => {
    const title = eventInfo.event.title || "";
    const bId = eventInfo.event.extendedProps?.bookingId;
    const isPending = title.toLowerCase().includes("förfrågan");
    const isConfirmed = title.toLowerCase().includes("bokning");
    let statusClass = isPending ? "is-pending" : isConfirmed ? "is-confirmed" : "is-neutral";

    return (
        <div className={`custom-event-card ${statusClass} ${bId ? `id-${bId}` : ""}`}>
            <span className="event-time">{eventInfo.timeText}</span>
            <b className="event-title">{title.replace("Förfrågan: ", "").replace("Bokning: ", "")}</b>
        </div>
    );
};

export const GoogleCalendar = ({ events, loading, clickedId, hoveredBookingId }: any) => {
    const navigate = useNavigate();

    // 2. STABILISERA EVENT-CLICK
    const handleEventClick = useCallback(
        (info: any) => {
            const bId = info.event.extendedProps?.bookingId;
            if (bId) navigate(`/admin/bookings/${bId}`);
        },
        [navigate],
    );

    // 3. MANUELL MARKERING (Fixar Hover & Click utan omrendering)
    useEffect(() => {
        document.querySelectorAll(".custom-event-card").forEach((el) => {
            el.classList.remove("is-hovered", "is-selected");
        });

        // Tänd hovrad bokning
        if (hoveredBookingId) {
            document.querySelectorAll(`.id-${hoveredBookingId}`).forEach((el) => {
                el.classList.add("is-hovered");
            });
        }

        // Tänd vald bokning
        if (clickedId) {
            document.querySelectorAll(`.id-${clickedId}`).forEach((el) => {
                el.classList.add("is-selected");
            });
        }
    }, [hoveredBookingId, clickedId]); // Körs varje gång dessa ändras

    const memoEvents = useMemo(() => events, [events]);

    return (
        <div className="calendar-container">
            {loading ? (
                <div className="loader">Laddar...</div>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="sv"
                    events={memoEvents}
                    height="auto"
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    eventDisplay="block"
                    // Viktigt: Vi håller klasserna tomma här för att undvika FullCalendar-diffar
                    eventClassNames={() => []}
                />
            )}
        </div>
    );
};

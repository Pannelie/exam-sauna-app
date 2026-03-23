import { useEffect, useCallback, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { renderEventContent } from "./components/RenderEventContent/RenderEventContent";
import "./googleCalendar.css";

export const GoogleCalendar = ({ events, loading, clickedId, hoveredBookingId }: any) => {
    const navigate = useNavigate();
    const calendarRef = useRef<any>(null);
    // Spara aktuell vy och datum
    const lastViewRef = useRef<string | null>(null);
    const lastDateRef = useRef<Date | null>(null);

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
    }, [hoveredBookingId, clickedId]);

    const memoEvents = useMemo(() => events, [events]);

    // Spara vy och datum innan events ändras
    useEffect(() => {
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            lastViewRef.current = api.view.type;
            lastDateRef.current = api.getDate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Bara första gången

    // Återställ vy och datum efter events ändrats
    useEffect(() => {
        if (calendarRef.current && lastViewRef.current && lastDateRef.current) {
            const api = calendarRef.current.getApi();
            api.changeView(lastViewRef.current, lastDateRef.current);
        }
    }, [memoEvents]);

    return (
        <div className="calendar-container">
            {loading ? (
                <div className="loader">Laddar...</div>
            ) : (
                <FullCalendar
                    ref={calendarRef}
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

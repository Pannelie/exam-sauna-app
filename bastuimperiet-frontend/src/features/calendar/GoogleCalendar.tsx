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
    const lastViewRef = useRef<string>("dayGridMonth");
    const lastDateRef = useRef<Date>(new Date());

    // Spara vy och datum vid varje vy- eller datumändring
    const handleViewChange = useCallback((arg: any) => {
        lastViewRef.current = arg.view.type;
        lastDateRef.current = arg.view.currentStart;
    }, []);

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
                    initialView={lastViewRef.current}
                    initialDate={lastDateRef.current}
                    locale="sv"
                    events={memoEvents}
                    height="auto"
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    eventDisplay="block"
                    eventClassNames={() => []}
                    viewDidMount={handleViewChange}
                    datesSet={handleViewChange}
                />
            )}
        </div>
    );
};

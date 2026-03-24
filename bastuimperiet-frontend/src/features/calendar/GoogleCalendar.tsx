import { useEffect, useCallback, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { renderEventContent } from "./components/RenderEventContent/RenderEventContent";
import "./googleCalendar.css";
import { useCalendar } from "./hooks/useCalendar";

export const GoogleCalendar = () => {
    const navigate = useNavigate();
    const calendarRef = useRef<any>(null);
    const lastViewRef = useRef<string>("dayGridMonth");
    const lastDateRef = useRef<Date>(new Date());

    // Hämta events, loading, clickedId, hoveredBookingId från global store/hook
    const { events, loading, clickedId, setClickedId, hoveredBookingId, setHoveredBookingId } = useCalendar();

    const handleViewChange = useCallback((arg: any) => {
        lastViewRef.current = arg.view.type;
        lastDateRef.current = arg.view.currentStart;
    }, []);

    const handleEventClick = useCallback(
        (info: any) => {
            const bId = info.event.extendedProps?.bookingId;
            if (bId) navigate(`/admin/bookings/${bId}`);
            setClickedId(bId || null);
        },
        [navigate, setClickedId],
    );

    useEffect(() => {
        document.querySelectorAll(".custom-event__card").forEach((el) => {
            el.classList.remove("is-hovered", "is-selected");
        });
        if (hoveredBookingId) {
            document.querySelectorAll(`.id-${hoveredBookingId}`).forEach((el) => {
                el.classList.add("is-hovered");
            });
        }
        if (clickedId) {
            document.querySelectorAll(`.id-${clickedId}`).forEach((el) => {
                el.classList.add("is-selected");
            });
        }
    }, [hoveredBookingId, clickedId]);

    useEffect(() => {
        if (hoveredBookingId === null) {
            document.querySelectorAll(".custom-event__card.is-hovered").forEach((el) => {
                el.classList.remove("is-hovered");
            });
        }
    }, [hoveredBookingId]);

    const memoEvents = useMemo(() => events, [events]);

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

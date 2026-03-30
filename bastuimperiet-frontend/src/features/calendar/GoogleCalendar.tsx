import { useEffect, useCallback, useMemo, useRef } from "react";
import type { ComponentProps } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { renderEventContent } from "./components/RenderEventContent/RenderEventContent";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import "./googleCalendar.css";
import { useCalendar } from "./hooks/useCalendar";

type FullCalendarProps = ComponentProps<typeof FullCalendar>;
type ViewChangeArg = { view: { type: string; currentStart: Date } };

export const GoogleCalendar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const calendarRef = useRef<FullCalendar | null>(null);
    const lastViewRef = useRef<string>("dayGridMonth");
    const lastDateRef = useRef<Date>(new Date());

    const { events, loading, clickedId, setClickedId, hoveredBookingId } = useCalendar();

    const handleViewChange = useCallback((arg: ViewChangeArg) => {
        lastViewRef.current = arg.view.type;
        lastDateRef.current = arg.view.currentStart;
    }, []);

    const handleEventClick = useCallback(
        (info: Parameters<NonNullable<FullCalendarProps["eventClick"]>>[0]) => {
            const bookingId = info.event.extendedProps?.bookingId;
            const bId = typeof bookingId === "string" ? bookingId : null;
            if (bId) navigate(`/admin/bookings/${bId}`);
            setClickedId(bId || null);
        },
        [navigate, setClickedId],
    );

    // Hantera highlighting av valda/hoverade events
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

    const memoEvents = useMemo(() => events, [events]);

    // Force update av vyn vid event-ändringar
    useEffect(() => {
        if (calendarRef.current && lastViewRef.current && lastDateRef.current) {
            const api = calendarRef.current.getApi();
            api.changeView(lastViewRef.current, lastDateRef.current);
        }
    }, [memoEvents]);

    return (
        <div className="calendar-container">
            {loading ? (
                <div className="calendar-loader">
                    <CircularProgress />
                </div>
            ) : (
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    // --- RESPONSIV TOOLBAR ---
                    headerToolbar={
                        isMobile
                            ? { left: "prev,next", center: "title", right: "" }
                            : { left: "prev,next", center: "title", right: "today" }
                    }
                    // --- RESPONSIVA TEXTER ---
                    dayHeaderFormat={{ weekday: isMobile ? "narrow" : "short" }}
                    titleFormat={isMobile ? { year: "numeric", month: "short" } : { year: "numeric", month: "long" }}
                    // --- LAYOUT & SCROLL FIX ---
                    height="100%"
                    contentHeight="100%"
                    aspectRatio={isMobile ? 0.8 : 1.35}
                    expandRows={true}
                    handleWindowResize={true}
                    stickyHeaderDates={true}
                    // --- FULLCALENDAR STANDARD ---
                    initialView={lastViewRef.current}
                    initialDate={lastDateRef.current}
                    locale="sv"
                    firstDay={1}
                    events={memoEvents}
                    eventClick={handleEventClick}
                    eventContent={renderEventContent}
                    eventDisplay="block"
                    viewDidMount={handleViewChange}
                    datesSet={handleViewChange}
                    buttonText={{
                        today: "Idag",
                        month: "Månad",
                        week: "Vecka",
                        day: "Dag",
                        list: "Lista",
                    }}
                />
            )}
        </div>
    );
};

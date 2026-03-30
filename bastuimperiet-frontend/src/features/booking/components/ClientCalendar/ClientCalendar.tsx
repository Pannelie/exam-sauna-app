import { useEffect, useMemo, useRef } from "react";
import type { ComponentProps } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toDateStr, getNextDay, calculateBlockedDates, hasOverlap } from "../../utils/calendarUtils";
import "./clientCalendar.css";
import { useCalendar } from "../../../calendar/hooks/useCalendar";

type ClientCalendarCustomerProps = {
    onDateSelect: (startDate: string, endDate: string) => void;
    startDate?: string;
    endDate?: string;
};

type FullCalendarProps = ComponentProps<typeof FullCalendar>;

export const ClientCalendarCustomer = ({ onDateSelect, startDate, endDate }: ClientCalendarCustomerProps) => {
    const calendarRef = useRef<FullCalendar>(null);
    const { events } = useCalendar();
    const todayStr = toDateStr(new Date());

    const blockedDates = useMemo(() => {
        return calculateBlockedDates(events);
    }, [events]);

    const calendarKey = useMemo(() => `calendar-${events?.length || 0}`, [events]);

    const handleDateClick: NonNullable<FullCalendarProps["dateClick"]> = (arg) => {
        const clickedDate = arg.dateStr;

        if (clickedDate < todayStr) return;
        if (blockedDates.has(clickedDate)) return;

        // Om inget startdatum finns ELLER om jag börjar om en ny bokning
        if (!startDate || (startDate && endDate)) {
            onDateSelect(`${clickedDate} 15:00`, "");
        }
        // Om jag har ett startdatum och väntar på slutdatum
        else if (startDate && !endDate) {
            const startDayStr = toDateStr(startDate);

            if (clickedDate > startDayStr) {
                if (hasOverlap(startDayStr, clickedDate, blockedDates)) {
                    onDateSelect(`${clickedDate} 15:00`, "");
                } else {
                    onDateSelect(startDate, `${clickedDate} 11:00`);
                }
            } else if (clickedDate < startDayStr) {
                onDateSelect(`${clickedDate} 15:00`, "");
            } else {
                onDateSelect("", "");
            }
        }
    };

    useEffect(() => {
        const api = calendarRef.current?.getApi();
        if (!api) return;

        api.unselect();

        if (startDate) {
            const sDay = toDateStr(startDate);
            if (endDate) {
                api.select(sDay, getNextDay(toDateStr(endDate)));
            } else {
                api.select(sDay, getNextDay(sDay));
            }
        }
    }, [startDate, endDate]);

    return (
        <FullCalendar
            key={calendarKey}
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="sv"
            firstDay={1}
            height="auto"
            selectable={true}
            unselectAuto={false}
            headerToolbar={{ left: "prev,next", center: "title", right: "today" }}
            // RÖDA DAGAR + TOOLTIP
            dayCellDidMount={(arg) => {
                const dateStr = toDateStr(arg.date);
                if (dateStr < todayStr) {
                    arg.el.style.cursor = "not-allowed";
                    arg.el.setAttribute("title", "Datum har passerat");
                } else if (blockedDates.has(dateStr)) {
                    arg.el.style.backgroundColor = "#ffcccc";
                    arg.el.style.cursor = "not-allowed";
                    arg.el.setAttribute("title", "Bokad");
                }
            }}
            buttonText={{
                today: "Idag",
                month: "Månad",
                week: "Vecka",
                day: "Dag",
                list: "Lista",
            }}
            // SPÄRR: Hindra markering över blockerade datum och passerade datum
            selectAllow={(selectInfo) => {
                const selectedStart = toDateStr(selectInfo.start);
                return selectedStart >= todayStr && !blockedDates.has(selectedStart);
            }}
            dateClick={handleDateClick}
            events={events}
            eventContent={() => null} // Returnerar inget innehåll för eventsen = ingen vit text
            displayEventTime={false} // Säkerställer att ingen tid visas
        />
    );
};

import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toDateStr, getNextDay, calculateBlockedDates, hasOverlap } from "../../utils/calendarUtils";
import "./clientCalendar.css";

export const ClientCalendarCustomer = ({ events, onDateSelect, startDate, endDate }: any) => {
    const calendarRef = useRef<FullCalendar>(null);

    const blockedDates = useMemo(() => {
        return calculateBlockedDates(events);
    }, [events]);

    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr;

        if (blockedDates.has(clickedDate)) return;

        // Om inget startdatum finns ELLER om vi börjar om en ny bokning
        if (!startDate || (startDate && endDate)) {
            onDateSelect(`${clickedDate} 15:00`, "");
        }
        // Om vi har ett startdatum och väntar på slutdatum
        else if (startDate && !endDate) {
            const startDayStr = toDateStr(startDate);

            if (clickedDate > startDayStr) {
                // Använd helper för att kolla krockar i intervallet
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
                if (blockedDates.has(dateStr)) {
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
            // SPÄRR: Hindra markering över blockerade datum
            selectAllow={(selectInfo) => !blockedDates.has(toDateStr(selectInfo.start))}
            dateClick={handleDateClick}
            events={[]}
        />
    );
};

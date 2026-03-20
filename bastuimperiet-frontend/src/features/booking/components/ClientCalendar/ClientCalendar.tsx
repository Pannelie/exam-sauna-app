import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";
import "./clientCalender.css";

export const ClientCalendar = ({ events, onDateSelect, startDate, endDate }: any) => {
    const calendarRef = useRef<FullCalendar>(null);

    // 2. Din klick-logik för att välja datum
    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr;
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        if (!startDate || (startDate && endDate)) {
            onDateSelect(clickedDate, "");
        } else {
            const startTs = new Date(startDate).getTime();
            const clickedTs = new Date(clickedDate).getTime();

            if (clickedTs < startTs) {
                onDateSelect(clickedDate, "");
            } else if (clickedDate === startDate) {
                onDateSelect("", "");
            } else {
                onDateSelect(startDate, clickedDate);
            }
        }
    };

    // 3. Visualisering av det valda intervallet (Blå markering)
    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) return;

        calendarApi.unselect();
        if (startDate) {
            const endRef = endDate ? new Date(endDate) : new Date(startDate);
            const visualEnd = new Date(endRef);
            visualEnd.setDate(visualEnd.getDate() + 1);
            const exclusiveEndStr = visualEnd.toISOString().split("T")[0];

            calendarApi.select(startDate, exclusiveEndStr);
        }
    }, [startDate, endDate]);

    const memoEvents = useMemo(() => {
        return events.map((e: any) => {
            return {
                ...e,
                title: "Bokat",
                allDay: true,
                display: "block",
                interactive: false,
            };
        });
    }, [events]);

    const renderClientEventContent = () => {
        return (
            <div className="custom-event-card is-confirmed client-booked-band">
                <b className="event-title">Bokat</b>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="sv"
                events={memoEvents}
                height="auto"
                selectable={true}
                unselectAuto={false}
                dateClick={handleDateClick}
                eventContent={renderClientEventContent}
                eventDisplay="block"
                eventClassNames={() => ["client-locked-event"]} // För att kunna styla bort hover
            />
        </div>
    );
};

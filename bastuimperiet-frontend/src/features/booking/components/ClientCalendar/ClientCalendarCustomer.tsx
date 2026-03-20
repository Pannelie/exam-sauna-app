import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core";
import "./clientCalendarCustomer.css";

// Render only confirmed bookings, light red, partial day (15:00-11:00)
const renderCustomerEventContent = (eventInfo: EventContentArg) => {
    // Only show a bar for confirmed bookings
    return (
        <div className="customer-booked-bar">
            <p className="customer-booked-label">Bokat</p>
        </div>
    );
};

export const ClientCalendarCustomer = ({ events, onDateSelect, startDate, endDate }: any) => {
    console.log("[ClientCalendarCustomer] events:", events);
    const calendarRef = useRef<FullCalendar>(null);

    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr;
        if (!startDate || (startDate && endDate)) {
            onDateSelect(clickedDate, "");
        } else {
            const startTs = new Date(startDate).getTime();
            const clickedTs = new Date(clickedDate).getTime();
            if (clickedTs < startTs) {
                onDateSelect(clickedDate, "");
            } else {
                onDateSelect(startDate, clickedDate);
            }
        }
    };

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) return;
        calendarApi.unselect();
        if (startDate) {
            const endRef = endDate ? new Date(endDate) : new Date(startDate);
            const visualEnd = new Date(endRef);
            visualEnd.setDate(visualEnd.getDate() + 1);
            calendarApi.select(startDate, visualEnd.toISOString().split("T")[0]);
        }
    }, [startDate, endDate]);

    // Only show confirmed bookings, and set time for partial day (15:00-11:00 next day)
    const memoEvents = useMemo(() => {
        if (!events || events.length === 0) return [];
        return events
            .filter((e: any) => typeof e.title === "string" && e.title.startsWith("Bokning:"))
            .map((e: any) => ({
                ...e,
                display: "block",
            }));
    }, [events]);

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
                eventContent={renderCustomerEventContent}
                eventDisplay="block"
                eventClassNames={() => ["customer-booked-event"]}
            />
        </div>
    );
};

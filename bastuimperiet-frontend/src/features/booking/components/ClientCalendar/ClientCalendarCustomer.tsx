import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { renderCustomerEventContent } from "../RenderCustomEventContent/RenderCustomEventContent";
import "./clientCalendarCustomer.css";

export const ClientCalendarCustomer = ({ events, onDateSelect, startDate, endDate }: any) => {
    console.log("[ClientCalendarCustomer] events:", events);
    const calendarRef = useRef<FullCalendar>(null);

    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr; // "YYYY-MM-DD"
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        // Hjälpfunktion för att få fram "dagen efter" som sträng
        const getNextDay = (dateStr: string) => {
            const d = new Date(dateStr);
            d.setDate(d.getDate() + 1);
            return d.toISOString().split("T")[0];
        };

        // Fall 1: Inget valt ännu, eller vi vill börja om (start & slut redan satta)
        if (!startDate || (startDate && endDate)) {
            const nextDay = getNextDay(clickedDate);
            // Vi sätter start till klickat datum och slut till nästa dag som default
            onDateSelect(clickedDate, nextDay);
        }
        // Fall 2: Vi har ett startdatum och klickar på ett senare datum
        else {
            const startTs = new Date(startDate).getTime();
            const clickedTs = new Date(clickedDate).getTime();

            if (clickedTs > startTs) {
                // Användaren väljer ett specifikt slutdatum (längre än 1 natt)
                onDateSelect(startDate, clickedDate);
            } else if (clickedDate === startDate) {
                // Klick på samma dag igen -> rensa
                onDateSelect("", "");
            } else {
                // Klick före startdatum -> sätt som nytt startdatum + 1 natt
                const nextDay = getNextDay(clickedDate);
                onDateSelect(clickedDate, nextDay);
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
                buttonText={{
                    today: "Idag",
                    month: "Månad",
                    week: "Vecka",
                    day: "Dag",
                    list: "Lista",
                }}
                buttonHints={{
                    prev: "Föregående månad",
                    next: "Nästa månad",
                    today: "Gå till idag",
                }}
                firstDay={1}
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

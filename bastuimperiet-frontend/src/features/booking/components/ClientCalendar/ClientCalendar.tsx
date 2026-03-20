import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface ClientCalendarProps {
    events: any[];
    onDateSelect: (start: string, end: string) => void;
    startDate?: string | null; // Nu läser vi dessa!
    endDate?: string | null;
}

export const ClientCalendar = ({ events, onDateSelect, startDate, endDate }: ClientCalendarProps) => {
    const calendarRef = useRef<FullCalendar>(null);

    // Denna effekt ser till att kalendern visar det valda intervallet visuellt
    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi && startDate && endDate) {
            calendarApi.select(startDate, endDate);
        } else if (calendarApi && !startDate) {
            calendarApi.unselect();
        }
    }, [startDate, endDate]); // Reagerar när datumen ändras i formuläret

    const maskedEvents = useMemo(() => {
        return events.map((e) => ({
            ...e,
            title: "",
            color: "#d1d1d1", // Grå färg för upptaget
            display: "background", // Gör det till ett bakgrundsblock (valfritt)
            editable: false,
        }));
    }, [events]);

    const handleSelect = (selectInfo: any) => {
        onDateSelect(selectInfo.startStr, selectInfo.endStr);
    };

    return (
        <div className="client-calendar-wrapper">
            <FullCalendar
                ref={calendarRef} // Behövs för att anropa .select() manuellt
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="sv"
                events={maskedEvents}
                selectable={true}
                selectMirror={true}
                unselectAuto={false}
                selectOverlap={false}
                select={handleSelect}
                height="auto"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
            />
        </div>
    );
};

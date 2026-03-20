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

    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr;

        // Om inget är valt, eller om vi redan har ett fullt intervall -> börja om
        if (!startDate || (startDate && endDate)) {
            onDateSelect(clickedDate, "");
        } else {
            const startTs = new Date(startDate).getTime();
            const clickedTs = new Date(clickedDate).getTime();

            if (clickedTs < startTs) {
                // Klickade före startdatumet -> sätt nytt startdatum
                onDateSelect(clickedDate, "");
            } else if (clickedDate === startDate) {
                // Klickade på samma dag -> rensa
                onDateSelect("", "");
            } else {
                // Giltigt slutdatum!
                onDateSelect(startDate, clickedDate);
            }
        }
    };

    // Denna effekt ser till att kalendern visar det valda intervallet visuellt
    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) {
            return;
        }
        if (startDate) {
            if (endDate) {
                // FullCalendar select() behöver dagen EFTER för att visa sista dagen som vald
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);
                const exclusiveEndStr = end.toISOString().split("T")[0];

                calendarApi.select(startDate, exclusiveEndStr);
            } else {
                // Markera bara den enskilda startdagen
                calendarApi.select(startDate, startDate);
            }
        }
    }, [startDate, endDate]);
    const maskedEvents = useMemo(() => {
        return events.map((e) => ({
            ...e,
            title: "",
            color: "#d1d1d1", // Grå färg för upptaget
            display: "background", // Gör det till ett bakgrundsblock (valfritt)
            overlap: false,
        }));
    }, [events]);

    return (
        <div className="client-calendar-wrapper">
            <FullCalendar
                ref={calendarRef} // Behövs för att anropa .select() manuellt
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="sv"
                events={maskedEvents}
                selectable={true}
                dateClick={handleDateClick}
                selectMirror={true}
                unselectAuto={false}
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

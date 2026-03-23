import type { EventContentArg } from "@fullcalendar/core";
import "./renderEventContent.css";

export const renderEventContent = (eventInfo: EventContentArg) => {
    const title = eventInfo.event.title || "";
    const bId = eventInfo.event.extendedProps?.bookingId;
    const isPending = title.toLowerCase().includes("förfrågan");
    const isConfirmed = title.toLowerCase().includes("bokning");
    let statusClass = isPending ? "is-pending" : isConfirmed ? "is-confirmed" : "is-neutral";

    return (
        <div className={`custom-event__card ${statusClass} ${bId ? `id-${bId}` : ""}`}>
            <span className="custom-event__time">{eventInfo.timeText} </span>
            <b className="custom-event__title">{title.replace("Förfrågan: ", "").replace("Bokning: ", "")}</b>
        </div>
    );
};

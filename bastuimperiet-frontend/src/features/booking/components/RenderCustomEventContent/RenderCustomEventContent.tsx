import type { EventContentArg } from "@fullcalendar/core";
import { TooltipComponent } from "../../../../components/Tooltip/Tooltip";

export const renderCustomerEventContent = (eventInfo: EventContentArg) => {
    const { isPast, event, isStart, isEnd } = eventInfo;

    // Formatera datum för Tooltip
    const startStr = event.start
        ? event.start.toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    const endStr = event.end
        ? event.end.toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";
    const tooltipTitle = `Bokning: ${startStr} - ${endStr}`;

    let width = "100%";
    let marginLeft = "0";
    if (isStart && isEnd) {
        // Detta händer nu bara om bokningen faktiskt är på samma dag
        width = "80%";
        marginLeft = "10%";
    } else if (isStart) {
        // Första dagen: 50% höger
        width = "50%";
        marginLeft = "50%";
    } else if (isEnd) {
        // Sista dagen: 50% vänster
        width = "50%";
        marginLeft = "0";
    } else {
        // Mellandagar: 100% full bredd
        width = "100%";
        marginLeft = "0";
    }

    console.log(`Datum: ${event.startStr}, isStart: ${isStart}, isEnd: ${isEnd}`);
    return (
        <TooltipComponent title={tooltipTitle}>
            <div
                className={`customer-booked-bar ${isPast ? "past-event" : ""}`}
                style={{
                    width: width,
                    marginLeft: marginLeft,
                    opacity: isPast ? 0.5 : 1,
                    // Behåll din existerande styling här under
                    borderLeft: isStart ? "4px solid #b91c1c" : "none",
                    borderRight: isEnd ? "4px solid #b91c1c" : "none",
                    borderRadius: isStart && isEnd ? "4px" : isStart ? "4px 0 0 4px" : isEnd ? "0 4px 4px 0" : "0",
                }}
            >
                <p className="customer-booked-label">
                    {/* Visa bara texten om det finns plats, t.ex. inte på halva dagar */}
                    {!isStart && !isEnd ? (isPast ? "Passerad" : "Bokat") : ""}
                </p>
            </div>
        </TooltipComponent>
    );
};

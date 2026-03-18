// components/GoogleCalendar/GoogleCalendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import svLocale from "@fullcalendar/core/locales/sv";
import { Box, useTheme } from "@mui/material";

export const GoogleCalendar = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                height: "100%",
                "& .fc": {
                    // Lite enkel styling för att matcha ditt tema
                    fontFamily: theme.typography.fontFamily,
                    border: "none",
                },
                "& .fc-event": {
                    cursor: "pointer",
                    borderRadius: "4px",
                    padding: "2px 4px",
                },
            }}
        >
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locales={[svLocale]}
                locale="sv"
                // Här anropar vi din backend direkt som en källa
                events={`${import.meta.env.VITE_API_URL}/calendar/events`}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth",
                }}
                height="100%"
                eventDisplay="block"
                eventColor={theme.palette.primary.main}
            />
        </Box>
    );
};

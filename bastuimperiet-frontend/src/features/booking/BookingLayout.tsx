import "./bookingLayout.css";
import { useState } from "react";
import { BookingStepper } from "./components/BookingStepper/BookingStepper";
import type { BookingFormData, BookingBase } from "../../types/bookingTypes";
import { useCalendar } from "../calendar/hooks/useCalendar";
import { useBookingFormStore } from "../../stores/useBookingFormStore";
import { ClientCalendarCustomer } from "./components/ClientCalendar/ClientCalendar";
import { useMediaQuery, useTheme, Box } from "@mui/material";

export const BookingLayout = () => {
    const { events, loading } = useCalendar();
    const { setField, reset: resetStore } = useBookingFormStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [activeStep, setActiveStep] = useState<number>(0);

    const initialFormData: BookingFormData = {
        firewood: 0,
        scent: 0,
        cleaning: false,
        delivery: false,
        name: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
        city: "",
        startDate: "",
        endDate: "",
    };

    const [formData, setFormData] = useState<BookingFormData>(initialFormData);

    const updateField = <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        const priceFields: (keyof BookingBase)[] = ["startDate", "endDate", "cleaning", "firewood", "scent", "delivery"];
        if (priceFields.includes(field as any)) {
            setField(field as any, value);
        }
    };

    const handleCalendarSelect = (start: string, end: string) => {
        updateField("startDate", start);
        updateField("endDate", end);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        resetStore();
        setActiveStep(0);
    };
    return (
        <Box
            className="booking_layout"
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // Stacka vertikalt på mobil
                gap: theme.spacing(4),
                padding: theme.spacing(isMobile ? 2 : 4),
            }}
        >
            {/* Kalender */}
            {!loading && !isMobile && (
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ClientCalendarCustomer
                        events={events}
                        onDateSelect={handleCalendarSelect}
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                    />
                </Box>
            )}
            {/* Formulär */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <BookingStepper
                    formData={formData}
                    updateField={updateField}
                    onReset={resetForm}
                    // Skicka ner nödvändig data för mobil-modalen
                    isMobile={isMobile}
                    calendarEvents={events}
                    // Kontrollera steget utifrån
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                />
            </Box>
        </Box>
    );
};

import { useState } from "react";
import { BookingStepper } from "./components/BookingStepper/BookingStepper";
import type { BookingFormData, BookingBase } from "../../types/bookingTypes";
import { useCalendar } from "../calendar/hooks/useCalendar";
import { useBookingFormStore } from "../../stores/useBookingFormStore";
import { ClientCalendarCustomer } from "./components/ClientCalendar/ClientCalendar";
import { useMediaQuery, useTheme } from "@mui/material";
import * as S from "./bookingLayout.style";

export const BookingLayout = () => {
    const { loading } = useCalendar();
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
        if (priceFields.includes(field as keyof BookingBase)) {
            setField(field, value);
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
        <S.StyledBookingLayout>
            {/* Kalender */}
            {!loading && !isMobile && (
                <S.ColumnWrapper>
                    <ClientCalendarCustomer onDateSelect={handleCalendarSelect} startDate={formData.startDate} endDate={formData.endDate} />
                </S.ColumnWrapper>
            )}

            {/* Formulär */}
            <S.ColumnWrapper>
                <BookingStepper
                    formData={formData}
                    updateField={updateField}
                    onReset={resetForm}
                    isMobile={isMobile}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                />
            </S.ColumnWrapper>
        </S.StyledBookingLayout>
    );
};

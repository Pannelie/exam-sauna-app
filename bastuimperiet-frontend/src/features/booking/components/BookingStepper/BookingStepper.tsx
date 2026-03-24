import { Step, StepLabel } from "@mui/material";
import { useState } from "react";
import type { BookingFormData } from "../../../../types/bookingTypes";
import { useStepContent } from "../../hooks/useStepContent";
import { validateBookingService } from "../../services/bookingService";
import * as S from "./bookingStepper.style";

interface BookingStepperProps {
    formData: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    onReset?: () => void;
    // Nya props för responsivitet och kalenderdata
    isMobile: boolean;
    calendarEvents: any[];
    // Props för att kontrollera steget utifrån
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const BookingStepper = ({
    formData,
    updateField,
    onReset,
    isMobile,
    calendarEvents,
    activeStep,
    setActiveStep,
}: BookingStepperProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const steps = ["Bokning", "Kontakt", "Skicka"];
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    // Handlers för navigation
    const handlers = {
        next: async () => {
            const result = await validateBookingService.validateStep(activeStep, formData);

            if (result.success) {
                setErrors({});
                setActiveStep((prev) => prev + 1);
            } else {
                setErrors(result.errors);
            }
        },

        back: () => setActiveStep((prev) => prev - 1),
        complete: () => setIsCompleted(true),
        reset: () => {
            setIsCompleted(false);
            if (onReset) {
                onReset();
            }
        },
        isCompleted,
    };
    // Använd hooken för att få innehållet för aktuellt steg
    const stepContent = useStepContent(activeStep, formData, updateField, handlers, errors, { isMobile, calendarEvents });

    return (
        <S.StyledBox isMobile={isMobile}>
            <S.StyledStepper isMobile={isMobile} activeStep={activeStep} alternativeLabel={isMobile}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isCompleted ? true : index < activeStep}>
                        <StepLabel>{!isMobile && label}</StepLabel>
                    </Step>
                ))}
            </S.StyledStepper>

            <S.StyledFormContent>{stepContent}</S.StyledFormContent>
        </S.StyledBox>
    );
};

import { Stepper, Step, StepLabel, Box, styled } from "@mui/material";
import { useState } from "react";
import type { BookingFormData } from "../../types/bookingTypes";
import { useStepContent } from "../../hooks/useStepContent";

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: theme.spacing(4),
    height: "100%",
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const StyledFormContent = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
});

export const BookingStepper = () => {
    const steps = ["Datum", "Tillval", "Kontakt", "Skicka"];
    const [activeStep, setActiveStep] = useState<number>(0);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const initialFormData: BookingFormData = {
        ved: 0,
        doft: 0,
        cleaning: false,
        delivery: false,
        name: "",
        email: "",
        phone: "",
        address: "",
        startDate: "",
        endDate: "",
    };
    const [formData, setFormData] = useState<BookingFormData>(initialFormData);

    function updateField<K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // Använd hooken för att få innehållet för aktuellt steg
    const stepContent = useStepContent(activeStep, formData, updateField, {
        next: () => setActiveStep((prev) => prev + 1),
        back: () => setActiveStep((prev) => prev - 1),
        complete: () => setIsCompleted(true),
        reset: () => {
            setActiveStep(0);
            setFormData(initialFormData);
            setIsCompleted(false);
        },
        isCompleted,
    });

    return (
        <StyledBox>
            <StyledStepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isCompleted ? true : index < activeStep}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </StyledStepper>

            {/* Samma container hela tiden, bara innehållet byts */}
            <StyledFormContent>{stepContent}</StyledFormContent>
        </StyledBox>
    );
};

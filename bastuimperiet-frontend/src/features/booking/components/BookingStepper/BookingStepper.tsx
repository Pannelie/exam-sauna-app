import { Stepper, Step, StepLabel, Box, styled } from "@mui/material";
import { useState } from "react";
import type { BookingFormData, BookingBase } from "../../types/bookingTypes";
import { useStepContent } from "../../hooks/useStepContent";
import { useBookingStore } from "../../stores/useBookingStore";
import { validateBookingService } from "../../services/bookingService";

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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const steps = ["Bokning", "Kontakt", "Skicka"];
    const [activeStep, setActiveStep] = useState<number>(0);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const { setField, reset: resetStore } = useBookingStore();

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

    function updateField<K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Uppdatera storen om fältet påverkar priset
        const priceFields: (keyof BookingBase)[] = ["startDate", "endDate", "cleaning", "firewood", "scent", "delivery"];
        if (priceFields.includes(field as any)) {
            setField(field as any, value);
        }
    }

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
            setActiveStep(0);
            setFormData(initialFormData);
            setIsCompleted(false);
            resetStore();
        },
        isCompleted,
    };
    // Använd hooken för att få innehållet för aktuellt steg
    const stepContent = useStepContent(activeStep, formData, updateField, handlers, errors);

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

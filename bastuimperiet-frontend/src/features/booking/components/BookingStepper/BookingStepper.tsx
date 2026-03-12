import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useState } from "react";
import type { BookingFormData } from "../../types/bookingTypes";

import { StepDates } from "../Steps/StepDates";
import { StepExtras } from "../Steps/StepExtras";
import { StepContact } from "../Steps/StepContact";
import { StepSummary } from "../Steps/StepSummary";

const steps = ["Datum", "Tillval", "Kontakt", "Skicka"];

export const BookingStepper = () => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const [formData, setFormData] = useState<BookingFormData>({
        ved: 0,
        doft: 0,
        cleaning: false,
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    function updateField<K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.9)",
                borderRadius: 3,
                padding: 4,
                height: "100%",
            }}
        >
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {activeStep === 0 && <StepDates data={formData} updateField={updateField} next={handleNext} />}
                {activeStep === 1 && <StepExtras data={formData} updateField={updateField} next={handleNext} back={handleBack} />}
                {activeStep === 2 && <StepContact data={formData} updateField={updateField} next={handleNext} back={handleBack} />}
                {activeStep === 3 && <StepSummary data={formData} back={handleBack} />}
            </Box>
        </Box>
    );
};

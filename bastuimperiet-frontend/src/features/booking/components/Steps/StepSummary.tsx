import { Stack, Typography } from "@mui/material";
import type { ApiBookingData, BookingFormData } from "../../../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { TotalPrice } from "../TotalPrice/TotalPrice";

import { postBooking } from "../../services/bookingService";
import { useState } from "react";
import { BookingSummary } from "../BookingSummary/BookingSummary";

interface StepSummaryProps {
    data: BookingFormData;
    back: () => void;
    complete: () => void;
    reset: () => void;
    isCompleted: boolean;
}

export const StepSummary = ({ data, back, complete, reset, isCompleted }: StepSummaryProps) => {
    const [bookingResult, setBookingResult] = useState<ApiBookingData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log("BookingFormData skickas:", JSON.stringify(data, null, 2));
        setFieldErrors({});
        try {
            const result = await postBooking(data);
            setBookingResult(result);
            setError(null);
            complete();
        } catch (error: any) {
            // Hantera specifika fältfel från backend
            if (error.response && error.response.data && error.response.data.details) {
                // details är en array av Joi errors
                const errors: Record<string, string> = {};
                error.response.data.details.forEach((err: any) => {
                    // err.path[0] är fältnamnet, err.message är felmeddelandet
                    errors[err.path[0]] = err.message;
                });
                setFieldErrors(errors);
            } else if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error instanceof Error ? error.message : "Något gick fel vid bokning");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCompleted && bookingResult) {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "1fr auto",
                    height: "100%",
                    gap: "16px",
                    width: "100%",
                }}
            >
                <Stack spacing={2} justifyContent="center">
                    <Typography variant="h5" align="center">
                        Tack för din förfrågan!
                    </Typography>
                    <Typography variant="h5" align="center">
                        {bookingResult.name}
                    </Typography>
                    <Typography variant="body2" align="center">
                        Vi återkommer inom kort med en bekräftelse.
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <FormButton variant="contained" onClick={reset} text="Ny förfrågan" />
                </Stack>
            </div>
        );
    }

    return (
        <section className="step_container">
            <Typography variant="h3" fontSize={24} gutterBottom>
                Kontrollera dina uppgifter
            </Typography>

            {/* Innehåll */}
            <Stack spacing={2} gap={0.2}>
                <BookingSummary booking={data} errors={fieldErrors} />
            </Stack>

            <TotalPrice />
            {error && (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            )}
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" disabled={isSubmitting} />
                <FormButton
                    variant="contained"
                    onClick={handleSubmit}
                    text={isSubmitting ? "Skickar..." : "Skicka förfrågan"}
                    disabled={isSubmitting}
                />
            </Stack>
        </section>
    );
};

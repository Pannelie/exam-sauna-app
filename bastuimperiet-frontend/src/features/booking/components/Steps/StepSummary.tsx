import { Stack, Typography } from "@mui/material";
import axios from "axios";
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
    isMobile: boolean;
}

type ValidationDetail = {
    path: Array<string | number>;
    message: string;
};

type StepSummaryErrorPayload = {
    details?: ValidationDetail[];
    message?: string;
};

export const StepSummary = ({ data, back, complete, reset, isCompleted, isMobile }: StepSummaryProps) => {
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
        } catch (error: unknown) {
            // Hantera specifika fältfel från backend
            if (axios.isAxiosError<StepSummaryErrorPayload>(error) && error.response?.data?.details) {
                // details är en array av Joi errors
                const errors: Record<string, string> = {};
                error.response.data.details.forEach((err) => {
                    // err.path[0] är fältnamnet, err.message är felmeddelandet
                    if (typeof err.path[0] === "string") {
                        errors[err.path[0]] = err.message;
                    }
                });
                setFieldErrors(errors);
            } else if (axios.isAxiosError<StepSummaryErrorPayload>(error) && error.response?.data?.message) {
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
                    <FormButton variant="contained" onClick={reset} text="Ny förfrågan" isMobile={isMobile} />
                </Stack>
            </div>
        );
    }

    return (
        <section className="step_container">
            <Typography variant="h3" fontSize={24} gutterBottom>
                Kontrollera din förfrågan
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
                <FormButton variant="outlined" onClick={back} text="Tillbaka" disabled={isSubmitting} isMobile={isMobile} type="back" />
                <FormButton
                    variant="contained"
                    onClick={handleSubmit}
                    text={isSubmitting ? "Skickar..." : "Skicka"}
                    disabled={isSubmitting}
                    type="send"
                />
            </Stack>
        </section>
    );
};

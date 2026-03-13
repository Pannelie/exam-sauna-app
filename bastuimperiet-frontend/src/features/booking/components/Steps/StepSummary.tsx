import { Stack, Typography, Divider } from "@mui/material";
import type { ApiBookingData, BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import { StyledTextField } from "../StyledTextField/StyledTextField";
import { postBooking } from "../../services/bookingService";
import { useState } from "react";
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

    const handleSubmit = async () => {
        // Logga alla fält innan submit
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
                {/* Datum  */}
                <Stack direction="row" spacing={2}>
                    <StyledTextField label="Startdatum" value={data.startDate} disabled variant="outlined" size="small" />
                    <StyledTextField label="Slutdatum" value={data.endDate} disabled variant="outlined" size="small" />
                </Stack>
                <Divider />

                {/* Tillval*/}
                <Stack direction="row" spacing={2}>
                    <StyledTextField label="Ved" value={data.firewood} disabled variant="outlined" size="small" />
                    <StyledTextField label="Doft" value={data.scent} disabled variant="outlined" size="small" />
                    <StyledTextField label="Städning" value={data.cleaning ? "Ja" : "Nej"} disabled variant="outlined" size="small" />
                </Stack>

                {/* Visa deliveryType om utkörning är på */}
                {data.delivery && (
                    <Stack direction="row" spacing={2}>
                        <StyledTextField label="Utkörning" value={data.delivery ? "Ja" : "Nej"} disabled variant="outlined" size="small" />

                        <StyledTextField
                            label="Typ av utkörning"
                            value={data.transportType === "return" ? "Tur & Retur" : "Enkel"}
                            disabled
                            variant="outlined"
                            size="small"
                        />
                    </Stack>
                )}
                <Divider />

                {/* Kontaktinfo */}
                <Stack direction="row" spacing={2}>
                    <StyledTextField
                        label="Namn"
                        value={`${data.name}`}
                        disabled
                        variant="outlined"
                        size="small"
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name}
                    />
                    <StyledTextField
                        label="Telefon"
                        value={data.phone}
                        disabled
                        variant="outlined"
                        size="small"
                        error={!!fieldErrors.phone}
                        helperText={fieldErrors.phone}
                    />
                </Stack>

                <StyledTextField
                    label="Email"
                    value={data.email}
                    disabled
                    variant="outlined"
                    size="small"
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                />
                <StyledTextField
                    label="Adress"
                    value={data.address}
                    disabled
                    variant="outlined"
                    size="small"
                    flex={2}
                    error={!!fieldErrors.address}
                    helperText={fieldErrors.address}
                />

                <Stack direction="row" spacing={2}>
                    <StyledTextField
                        label="Postnummer"
                        value={data.postalCode}
                        disabled
                        variant="outlined"
                        size="small"
                        error={!!fieldErrors.postalCode}
                        helperText={fieldErrors.postalCode}
                    />
                    <StyledTextField
                        label="Stad"
                        value={data.city}
                        disabled
                        variant="outlined"
                        size="small"
                        error={!!fieldErrors.city}
                        helperText={fieldErrors.city}
                    />
                </Stack>
            </Stack>

            <TotalPrice />
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={handleSubmit} text="Skicka förfrågan" />
            </Stack>
        </section>
    );
};

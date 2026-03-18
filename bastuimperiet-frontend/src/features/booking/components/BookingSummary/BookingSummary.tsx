import { Divider, Stack } from "@mui/material";
import { StyledTextField } from "../StyledTextField/StyledTextField";
import type { BookingFormData } from "../../../../types/bookingTypes";

interface BookingSummaryProps {
    booking: BookingFormData;
    errors?: Record<string, string>; // Lägg till denna
}

export const BookingSummary = ({ booking, errors = {} }: BookingSummaryProps) => {
    return (
        <>
            {/* Datum */}
            <Stack direction="row" spacing={2}>
                <StyledTextField label="Startdatum" value={booking.startDate} disabled variant="outlined" size="small" />
                <StyledTextField label="Slutdatum" value={booking.endDate} disabled variant="outlined" size="small" />
            </Stack>
            <Divider />

            {/* Tillval */}
            <Stack direction="row" spacing={2}>
                <StyledTextField label="Ved" value={booking.firewood} disabled variant="outlined" size="small" />
                <StyledTextField label="Doft" value={booking.scent} disabled variant="outlined" size="small" />
                <StyledTextField label="Städning" value={booking.cleaning ? "Ja" : "Nej"} disabled variant="outlined" size="small" />
            </Stack>

            {booking.delivery && (
                <Stack direction="row" spacing={2}>
                    <StyledTextField label="Utkörning" value="Ja" disabled variant="outlined" size="small" />
                    <StyledTextField
                        label="Typ av utkörning"
                        value={booking.transportType === "return" ? "Tur & Retur" : "Enkel"}
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
                    value={booking.name}
                    disabled
                    variant="outlined"
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <StyledTextField
                    label="Telefon"
                    value={booking.phone}
                    disabled
                    variant="outlined"
                    size="small"
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
            </Stack>

            <StyledTextField
                label="Email"
                value={booking.email}
                disabled
                variant="outlined"
                size="small"
                error={!!errors.email}
                helperText={errors.email}
            />
            <StyledTextField
                label="Adress"
                value={booking.address}
                disabled
                variant="outlined"
                size="small"
                flex={2}
                error={!!errors.address}
                helperText={errors.address}
            />

            <Stack direction="row" spacing={2}>
                <StyledTextField
                    label="Postnummer"
                    value={booking.postalCode}
                    disabled
                    variant="outlined"
                    size="small"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                />
                <StyledTextField
                    label="Stad"
                    value={booking.city}
                    disabled
                    variant="outlined"
                    size="small"
                    error={!!errors.city}
                    helperText={errors.city}
                />
            </Stack>
        </>
    );
};

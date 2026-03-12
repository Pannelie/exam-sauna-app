import { Stack, Button, TextField } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";

interface StepSummaryProps {
    data: BookingFormData;
    back: () => void;
}

export const StepSummary = ({ data, back }: StepSummaryProps) => {
    const handleSubmit = () => {
        console.log("Skickar bokning:", data);
        alert("Förfrågan skickad!");
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "1fr auto", // innehåll tar all plats, knappar tar sin höjd
                height: "100%", // fyller förälderns höjd
                gap: "16px",
                width: "100%",
            }}
        >
            {/* Innehåll */}
            <Stack spacing={2}>
                {/* Datum  */}
                <Stack direction="row" spacing={2}>
                    <TextField label="Startdatum" value={data.startDate} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Slutdatum" value={data.endDate} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>

                {/* Tillval*/}
                <Stack direction="row" spacing={2}>
                    <TextField label="Ved" value={data.ved} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Doft" value={data.doft} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField
                        label="Städning"
                        value={data.cleaning ? "Ja" : "Nej"}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={{ flex: 1 }}
                    />
                </Stack>

                {/* Kontaktinfo */}
                <Stack direction="row" spacing={2}>
                    <TextField label="Namn" value={data.name} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Email" value={data.email} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <TextField label="Telefon" value={data.phone} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Adress" value={data.address} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button onClick={back}>Tillbaka</Button>
                <Button variant="contained" sx={{ backgroundColor: "#d8a74e" }} onClick={handleSubmit}>
                    Skicka förfrågan
                </Button>
            </Stack>
        </div>
    );
};

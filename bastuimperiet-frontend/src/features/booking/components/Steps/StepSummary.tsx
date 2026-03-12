import { Stack, Typography, Button } from "@mui/material";
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
        <Stack spacing={2}>
            <Typography variant="h6">Granska din bokning</Typography>
            <Typography>
                Datum: {data.startDate} – {data.endDate}
            </Typography>
            <Typography>Ved: {data.ved}</Typography>
            <Typography>Doft: {data.doft}</Typography>
            <Typography>Städning: {data.cleaning ? "Ja" : "Nej"}</Typography>
            <Typography>Namn: {data.name}</Typography>
            <Typography>Email: {data.email}</Typography>
            <Typography>Telefon: {data.phone}</Typography>
            <Typography>Adress: {data.address}</Typography>

            <Button variant="contained" sx={{ backgroundColor: "#d8a74e" }} onClick={handleSubmit}>
                Skicka förfrågan
            </Button>

            <Button onClick={back}>Tillbaka</Button>
        </Stack>
    );
};

import { TextField, Button, Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";

interface StepContactProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    back: () => void;
    next: () => void;
}

export const StepContact = ({ data, updateField, back, next }: StepContactProps) => {
    return (
        <Stack spacing={2}>
            <TextField label="Namn" value={data.name} onChange={(e) => updateField("name", e.target.value)} />

            <TextField label="Epostadress" value={data.email} onChange={(e) => updateField("email", e.target.value)} />

            <TextField label="Telefonnummer" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />

            <TextField label="Adress" value={data.address} onChange={(e) => updateField("address", e.target.value)} />

            <Button
                variant="contained"
                onClick={next}
                sx={{
                    backgroundColor: "#d8a74e",
                    fontSize: 20,
                    padding: 2,
                }}
            >
                Nästa steg
            </Button>

            <Button onClick={back}>Tillbaka</Button>
        </Stack>
    );
};

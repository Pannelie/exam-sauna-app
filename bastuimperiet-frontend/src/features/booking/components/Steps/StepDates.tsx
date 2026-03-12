import { Stack, TextField, Button } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";

interface StepDatesProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
}

export const StepDates = ({ data, updateField, next }: StepDatesProps) => {
    return (
        <Stack spacing={2}>
            <TextField
                type="date"
                label="Startdatum"
                value={data.startDate || ""}
                onChange={(e) => updateField("startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                type="date"
                label="Slutdatum"
                value={data.endDate || ""}
                onChange={(e) => updateField("endDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" sx={{ backgroundColor: "#d8a74e" }} onClick={next}>
                Nästa steg
            </Button>
        </Stack>
    );
};

import { Stack, TextField, Button } from "@mui/material";
import { NextButton } from "../NextButton/NextButton";
import type { BookingFormData } from "../../types/bookingTypes";

interface StepDatesProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
}

export const StepDates = ({ data, updateField, next }: StepDatesProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "1fr auto", // innehåll tar allt, knappar tar sin höjd
                height: "100%", // viktig: fyller förälderns höjd
                gap: "16px",
            }}
        >
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
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button disabled>Tillbaka</Button>
                <NextButton onClick={next} />
            </Stack>
        </div>
    );
};

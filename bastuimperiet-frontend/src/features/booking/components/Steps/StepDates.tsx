import { Stack, TextField } from "@mui/material";
import { FormButton } from "../FormButton/FormButton";
import type { BookingFormData } from "../../types/bookingTypes";
import { TotalPrice } from "../TotalPrice/TotalPrice";

interface StepDatesProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
}

export const StepDates = ({ data, updateField, next }: StepDatesProps) => {
    return (
        <section className="step_container">
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
                <TotalPrice data={data} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

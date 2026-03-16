import { Stack } from "@mui/material";
import { FormButton } from "../FormButton/FormButton";
import type { BookingFormData } from "../../types/bookingTypes";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import { MyDatePicker } from "../DatePicker/DatePicker";
import { StepExtras } from "./StepExtras";
interface StepDatesProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
    errors: Record<string, string>;
}

export const StepDates = ({ data, updateField, next, errors }: StepDatesProps) => {
    return (
        <section className="step_container">
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <MyDatePicker
                        label="Startdatum"
                        value={data.startDate || null}
                        onChange={(val) => updateField("startDate", val)}
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                    />
                    <MyDatePicker
                        label="Slutdatum"
                        value={data.endDate || null}
                        onChange={(val) => updateField("endDate", val)}
                        error={!!errors.endDate}
                        helperText={errors.endDate}
                    />
                </Stack>
            </Stack>
            {/* Extras */}
            <Stack spacing={2}>
                <StepExtras data={data} updateField={updateField} />
            </Stack>
            <TotalPrice />
            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

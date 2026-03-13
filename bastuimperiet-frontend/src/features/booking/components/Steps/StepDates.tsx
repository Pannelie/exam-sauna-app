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
}

export const StepDates = ({ data, updateField, next }: StepDatesProps) => {
    return (
        <section className="step_container">
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <MyDatePicker label="Startdatum" value={data.startDate || null} onChange={(val) => updateField("startDate", val)} />
                    <MyDatePicker label="Slutdatum" value={data.endDate || null} onChange={(val) => updateField("endDate", val)} />
                </Stack>
            </Stack>
            {/* Extras */}
            <Stack spacing={2}>
                <StepExtras data={data} updateField={updateField} />
            </Stack>
            <TotalPrice data={data} />
            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

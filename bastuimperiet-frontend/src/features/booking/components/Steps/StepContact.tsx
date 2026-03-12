import "./steps.css";
import { TextField, Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";

interface StepContactProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    back: () => void;
    next: () => void;
}

export const StepContact = ({ data, updateField, back, next }: StepContactProps) => {
    return (
        <section className="step_container">
            <Stack spacing={2}>
                <TextField label="Namn" value={data.name} onChange={(e) => updateField("name", e.target.value)} />
                <TextField label="Telefonnummer" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />
                <TextField label="Epostadress" value={data.email} onChange={(e) => updateField("email", e.target.value)} />
                <TextField label="Adress" value={data.address} onChange={(e) => updateField("address", e.target.value)} />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

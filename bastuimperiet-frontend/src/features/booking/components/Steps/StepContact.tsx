import "./steps.css";
import { Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { StyledTextField } from "../StyledTextField/StyledTextField";

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
                <Stack direction="row" spacing={2}>
                    <StyledTextField label="Namn" value={data.name} onChange={(e) => updateField("name", e.target.value)} />
                    <StyledTextField label="Telefonnummer" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </Stack>
                <Stack spacing={2}>
                    <StyledTextField label="Epostadress" value={data.email} onChange={(e) => updateField("email", e.target.value)} />
                    <StyledTextField label="Adress" value={data.address} onChange={(e) => updateField("address", e.target.value)} />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <StyledTextField label="Postnummer" value={data.postcode} onChange={(e) => updateField("postcode", e.target.value)} />
                    <StyledTextField label="Stad" value={data.city} onChange={(e) => updateField("city", e.target.value)} />
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

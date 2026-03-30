import "./steps.css";
import { Stack } from "@mui/material";
import type { BookingFormData } from "../../../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { StyledTextField } from "../StyledTextField/StyledTextField";

interface StepContactProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    back: () => void;
    next: () => void;
    errors: Record<string, string>;
    isMobile: boolean;
}

export const StepContact = ({ data, updateField, back, next, errors, isMobile }: StepContactProps) => {
    return (
        <section className="step_container">
            <Stack spacing={2}>
                <StyledTextField
                    label="Namn"
                    value={data.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <StyledTextField
                    label="Telefonnummer"
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />

                <StyledTextField
                    label="Epostadress"
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <StyledTextField
                    label="Adress"
                    value={data.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    error={!!errors.address}
                    helperText={errors.address}
                />
                <StyledTextField
                    label="Postnummer"
                    value={data.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                />
                <StyledTextField
                    label="Stad"
                    value={data.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton type="back" variant="outlined" onClick={back} text="Tillbaka" isMobile={isMobile} />
                <FormButton type="next" variant="contained" onClick={next} text="Nästa steg" isMobile={isMobile} />
            </Stack>
        </section>
    );
};

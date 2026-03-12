import "./steps.css";
import { TextField, Stack, styled } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";

interface StepContactProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    back: () => void;
    next: () => void;
}

const StyledSmallTextField = styled(TextField)({
    flex: "",
});

export const StepContact = ({ data, updateField, back, next }: StepContactProps) => {
    return (
        <section className="step_container">
            <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                    <StyledSmallTextField
                        label="Förnamn"
                        value={data.firstName}
                        size="small"
                        onChange={(e) => updateField("firstName", e.target.value)}
                    />
                    <StyledSmallTextField
                        label="Efternamn"
                        value={data.lastName}
                        size="small"
                        onChange={(e) => updateField("lastName", e.target.value)}
                    />
                </Stack>
                <TextField label="Telefonnummer" value={data.phone} size="small" onChange={(e) => updateField("phone", e.target.value)} />
                <TextField label="Epostadress" value={data.email} size="small" onChange={(e) => updateField("email", e.target.value)} />
                <TextField label="Adress" value={data.address} size="small" onChange={(e) => updateField("address", e.target.value)} />
                <Stack direction="row" spacing={2}>
                    <StyledSmallTextField
                        label="Postnummer"
                        value={data.postcode}
                        size="small"
                        onChange={(e) => updateField("postcode", e.target.value)}
                    />
                    <TextField label="Stad" value={data.city} size="small" onChange={(e) => updateField("city", e.target.value)} />
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

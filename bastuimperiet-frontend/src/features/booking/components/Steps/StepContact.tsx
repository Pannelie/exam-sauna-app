import "./steps.css";
import { TextField, Button, Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { NextButton } from "../NextButton/NextButton";

interface StepContactProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    back: () => void;
    next: () => void;
}

export const StepContact = ({ data, updateField, back, next }: StepContactProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "1fr auto",
                height: "100%",
                gap: "16px",
            }}
        >
            <Stack spacing={1}>
                <TextField label="Namn" value={data.name} onChange={(e) => updateField("name", e.target.value)} />

                <TextField label="Epostadress" value={data.email} onChange={(e) => updateField("email", e.target.value)} />

                <TextField label="Telefonnummer" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />

                <TextField label="Adress" value={data.address} onChange={(e) => updateField("address", e.target.value)} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button onClick={back}>Tillbaka</Button>
                <NextButton onClick={next} />
            </Stack>
        </div>
    );
};

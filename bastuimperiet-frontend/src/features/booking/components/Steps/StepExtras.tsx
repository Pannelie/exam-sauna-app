import { Button, Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { NextButton } from "../NextButton/NextButton";

interface StepExtrasProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
    back: () => void;
}
export const StepExtras = ({ data, updateField, next, back }: StepExtrasProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "1fr auto", // innehåll tar all plats, knappar tar sin höjd
                height: "100%", // fyller förälderns höjd
                gap: "16px",
            }}
        >
            <Stack spacing={2}>
                <Button variant="contained" onClick={() => updateField("ved", data.ved + 1)}>
                    Ved + {data.ved}
                </Button>

                <Button variant="contained" onClick={() => updateField("doft", data.doft + 1)}>
                    Doft + {data.doft}
                </Button>

                <Button variant={data.cleaning ? "contained" : "outlined"} onClick={() => updateField("cleaning", !data.cleaning)}>
                    Städning
                </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button onClick={back}>Tillbaka</Button>
                <NextButton onClick={next} />
            </Stack>
        </div>
    );
};

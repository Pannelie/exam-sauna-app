import { Button, Stack } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";

interface StepExtrasProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
    back: () => void;
}
export const StepExtras = ({ data, updateField, next, back }: StepExtrasProps) => {
    return (
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

            <Button
                variant="contained"
                onClick={next}
                sx={{
                    backgroundColor: "#d8a74e",
                    fontSize: 20,
                    padding: 2,
                }}
            >
                Nästa steg
            </Button>
            <Button onClick={back}>Tillbaka</Button>
        </Stack>
    );
};

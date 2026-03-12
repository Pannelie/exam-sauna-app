import { Stack, TextField, Typography, Divider } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { TotalPrice } from "../TotalPrice/TotalPrice";

interface StepSummaryProps {
    data: BookingFormData;
    back: () => void;
    complete: () => void;
    reset: () => void;
    isCompleted: boolean;
}

export const StepSummary = ({ data, back, complete, reset, isCompleted }: StepSummaryProps) => {
    const handleSubmit = () => {
        console.log("Skickar bokning:", data);
        complete();
    };

    if (isCompleted) {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "1fr auto",
                    height: "100%",
                    gap: "16px",
                    width: "100%",
                }}
            >
                <Stack spacing={2} justifyContent="center">
                    <Typography variant="h5" align="center">
                        Tack för din förfrågan!
                    </Typography>
                    <Typography variant="body2" align="center">
                        Vi återkommer inom kort med en bekräftelse.
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <FormButton variant="contained" onClick={reset} text="Ny förfrågan" />
                </Stack>
            </div>
        );
    }

    return (
        <section className="step_container">
            {/* Innehåll */}
            <Stack spacing={3}>
                {/* Datum  */}
                <Stack direction="row" spacing={2}>
                    <TextField label="Startdatum" value={data.startDate} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Slutdatum" value={data.endDate} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>
                <Divider />

                {/* Tillval*/}
                <Stack direction="row" spacing={2}>
                    <TextField label="Ved" value={data.ved} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Doft" value={data.doft} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField
                        label="Städning"
                        value={data.cleaning ? "Ja" : "Nej"}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={{ flex: 1 }}
                    />
                </Stack>

                {/* Visa deliveryType om utkörning är på */}
                {data.delivery && (
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Utkörning"
                            value={data.delivery ? "Ja" : "Nej"}
                            disabled
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1 }}
                        />

                        <TextField
                            label="Typ av utkörning"
                            value={data.deliveryType === "return" ? "Tur & Retur" : "Enkel"}
                            disabled
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1 }}
                        />
                    </Stack>
                )}
                <Divider />

                {/* Kontaktinfo */}
                <Stack direction="row" spacing={2}>
                    <TextField label="Namn" value={data.name} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                    <TextField label="Telefon" value={data.phone} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <TextField label="Email" value={data.email} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField label="Adress" value={data.address} disabled variant="outlined" size="small" sx={{ flex: 1 }} />
                </Stack>
                <TotalPrice data={data} />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={handleSubmit} text="Skicka förfrågan" />
            </Stack>
        </section>
    );
};

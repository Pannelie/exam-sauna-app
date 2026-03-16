import { styled, Stack, Typography, IconButton, Paper, Switch, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SpaIcon from "@mui/icons-material/Spa";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { TransportType } from "../../../../types/bookingTypes";
import type { BookingFormData } from "../../../../types/bookingTypes";
import { useBookingStore } from "../../stores/useBookingStore";

const StyledPaper = styled(Paper)({
    padding: "1rem",
});

interface StepExtrasProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
}

export const StepExtras = ({ data, updateField }: StepExtrasProps) => {
    const { prices } = useBookingStore();
    const priceVed = prices?.firewood || 40;
    const priceDoft = prices?.scent || 30;
    const priceCleaning = prices?.cleaning || 995;
    const deliveryStartFee = prices?.deliveryStartFee || 1000; // startavgift
    const priceOneWay = prices?.deliveryOneWay || 40; // per km
    const priceReturn = prices?.deliveryReturn || 80; // per km tur & retur

    return (
        <>
            {/* Ved */}
            <StyledPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LocalFireDepartmentIcon />
                        <Stack>
                            <Typography>Ved</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceVed} kr / st
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton disabled={data.firewood === 0} onClick={() => updateField("firewood", data.firewood - 1)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography>{data.firewood}</Typography>
                        <IconButton onClick={() => updateField("firewood", data.firewood + 1)}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </StyledPaper>

            {/* Doft */}
            <StyledPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <SpaIcon />
                        <Stack>
                            <Typography>Doft</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceDoft} kr / st
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton disabled={data.scent === 0} onClick={() => updateField("scent", data.scent - 1)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography>{data.scent}</Typography>
                        <IconButton onClick={() => updateField("scent", data.scent + 1)}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </StyledPaper>

            {/* Städning */}
            <StyledPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CleaningServicesIcon />
                        <Stack>
                            <Typography>Städning</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceCleaning} kr
                            </Typography>
                        </Stack>
                    </Stack>
                    <Switch checked={data.cleaning} onChange={() => updateField("cleaning", !data.cleaning)} />
                </Stack>
            </StyledPaper>

            {/* Utkörning */}
            <StyledPaper>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocalShippingIcon />
                            <Stack>
                                <Typography>Utkörning</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Startavgift {deliveryStartFee} kr + km-pris tillkommer
                                </Typography>
                            </Stack>
                        </Stack>
                        <Switch checked={data.delivery} onChange={() => updateField("delivery", !data.delivery)} />
                    </Stack>

                    {data.delivery && (
                        <RadioGroup
                            row
                            value={data.transportType || TransportType.OneWay}
                            onChange={(e) => updateField("transportType", e.target.value as TransportType)}
                        >
                            <FormControlLabel value={TransportType.OneWay} control={<Radio />} label={`Enkel (${priceOneWay} kr/km)`} />
                            <FormControlLabel
                                value={TransportType.Return}
                                control={<Radio />}
                                label={`Tur & Retur (${priceReturn} kr/km)`}
                            />
                        </RadioGroup>
                    )}
                </Stack>
            </StyledPaper>
        </>
    );
};

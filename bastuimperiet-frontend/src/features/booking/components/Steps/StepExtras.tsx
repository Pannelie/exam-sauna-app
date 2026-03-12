import { Stack, Typography, IconButton, Paper, Switch, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SpaIcon from "@mui/icons-material/Spa";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import type { BookingFormData } from "../../types/bookingTypes";
import { FormButton } from "../FormButton/FormButton";
import { TotalPrice } from "../TotalPrice/TotalPrice";

interface StepExtrasProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
    next: () => void;
    back: () => void;
}

export const StepExtras = ({ data, updateField, next, back }: StepExtrasProps) => {
    const priceVed = 50;
    const priceDoft = 30;
    const priceCleaning = 500;
    const deliveryStartFee = 1000; // startavgift
    const priceOneWay = 40; // per km
    const priceReturn = 80; // per km tur & retur

    return (
        <section className="step_container">
            <Stack spacing={2}>
                {/* Ved */}
                <Paper sx={{ p: 2 }}>
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
                            <IconButton disabled={data.ved === 0} onClick={() => updateField("ved", data.ved - 1)}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography>{data.ved}</Typography>
                            <IconButton onClick={() => updateField("ved", data.ved + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Paper>

                {/* Doft */}
                <Paper sx={{ p: 2 }}>
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
                            <IconButton disabled={data.doft === 0} onClick={() => updateField("doft", data.doft - 1)}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography>{data.doft}</Typography>
                            <IconButton onClick={() => updateField("doft", data.doft + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Paper>

                {/* Städning */}
                <Paper sx={{ p: 2 }}>
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
                </Paper>

                {/* Utkörning */}
                <Paper sx={{ p: 2 }}>
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
                                value={data.deliveryType || "oneWay"}
                                onChange={(e) => updateField("deliveryType", e.target.value as "oneWay" | "return")}
                            >
                                <FormControlLabel value="oneWay" control={<Radio />} label={`Enkel (${priceOneWay} kr/km)`} />
                                <FormControlLabel value="return" control={<Radio />} label={`Tur & Retur (${priceReturn} kr/km)`} />
                            </RadioGroup>
                        )}
                    </Stack>
                </Paper>

                {/* Total (räknar bara med extra och startavgift, km tillkommer senare) */}
                <TotalPrice data={data} />
            </Stack>

            {/* Navigation */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <FormButton variant="outlined" onClick={back} text="Tillbaka" />
                <FormButton variant="contained" onClick={next} text="Nästa steg" />
            </Stack>
        </section>
    );
};

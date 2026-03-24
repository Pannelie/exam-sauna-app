import * as S from "../StepExtras/stepExtras.style.ts"; // Förutsatt att dina styled-komponenter ligger här
import {
    Stack,
    Typography,
    IconButton,
    Switch,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    useMediaQuery,
    useTheme,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SpaIcon from "@mui/icons-material/Spa";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { TransportType } from "../../../../../types/bookingTypes";
import type { BookingFormData } from "../../../../../types/bookingTypes";
import { useBookingFormStore } from "../../../../../stores/useBookingFormStore";

interface StepExtrasProps {
    data: BookingFormData;
    updateField: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
}

export const StepExtras = ({ data, updateField }: StepExtrasProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { prices } = useBookingFormStore();

    const priceVed = prices?.firewood || 40;
    const priceDoft = prices?.scent || 30;
    const priceCleaning = prices?.cleaning || 995;
    const deliveryStartFee = prices?.deliveryStartFee || 1000;

    // Kompakt väljare för mobil
    const Counter = ({ value, onAdd, onRemove }: any) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ bgcolor: "#f5f5f5", borderRadius: "20px", p: 0.5 }}>
            <IconButton
                size="small"
                onClick={onRemove}
                disabled={value === 0}
                sx={{ bgcolor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
            >
                <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ minWidth: 24, textAlign: "center", fontWeight: "bold" }}>
                {value}
            </Typography>
            <IconButton size="small" onClick={onAdd} sx={{ bgcolor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <AddIcon fontSize="small" />
            </IconButton>
        </Stack>
    );

    if (isMobile) {
        return (
            <Box>
                <S.MobileListContainer>
                    {/* Ved */}
                    <S.ListRow>
                        <Stack direction="row" alignItems="center">
                            <S.IconWrapper>
                                <LocalFireDepartmentIcon sx={{ color: "#e67e22" }} />
                            </S.IconWrapper>
                            <Stack>
                                <Typography variant="body2" fontWeight="bold">
                                    Ved
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {priceVed} kr/st
                                </Typography>
                            </Stack>
                        </Stack>
                        <Counter
                            value={data.firewood}
                            onAdd={() => updateField("firewood", data.firewood + 1)}
                            onRemove={() => updateField("firewood", data.firewood - 1)}
                        />
                    </S.ListRow>
                    <Divider variant="middle" />

                    {/* Doft */}
                    <S.ListRow>
                        <Stack direction="row" alignItems="center">
                            <S.IconWrapper>
                                <SpaIcon sx={{ color: "#2ecc71" }} />
                            </S.IconWrapper>
                            <Stack>
                                <Typography variant="body2" fontWeight="bold">
                                    Doftpaket
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {priceDoft} kr/st
                                </Typography>
                            </Stack>
                        </Stack>
                        <Counter
                            value={data.scent}
                            onAdd={() => updateField("scent", data.scent + 1)}
                            onRemove={() => updateField("scent", data.scent - 1)}
                        />
                    </S.ListRow>
                    <Divider variant="middle" />

                    {/* Städning */}
                    <S.ListRow>
                        <Stack direction="row" alignItems="center">
                            <S.IconWrapper>
                                <CleaningServicesIcon sx={{ color: "#3498db" }} />
                            </S.IconWrapper>
                            <Stack>
                                <Typography variant="body2" fontWeight="bold">
                                    Städning
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {priceCleaning} kr
                                </Typography>
                            </Stack>
                        </Stack>
                        <Switch size="small" checked={data.cleaning} onChange={() => updateField("cleaning", !data.cleaning)} />
                    </S.ListRow>
                    <Divider variant="middle" />

                    {/* Utkörning */}
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center">
                                <S.IconWrapper>
                                    <LocalShippingIcon sx={{ color: "#34495e" }} />
                                </S.IconWrapper>
                                <Stack>
                                    <Typography variant="body2" fontWeight="bold">
                                        Utkörning
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Startavgift + milersättning
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Switch size="small" checked={data.delivery} onChange={() => updateField("delivery", !data.delivery)} />
                        </Stack>
                        {data.delivery && (
                            <Box sx={{ mt: 1, ml: 6 }}>
                                <RadioGroup
                                    value={data.transportType || TransportType.OneWay}
                                    onChange={(e) => updateField("transportType", e.target.value as TransportType)}
                                >
                                    <FormControlLabel
                                        value={TransportType.OneWay}
                                        control={<Radio size="small" />}
                                        label={<Typography variant="caption">Enkel resa</Typography>}
                                    />
                                    <FormControlLabel
                                        value={TransportType.Return}
                                        control={<Radio size="small" />}
                                        label={<Typography variant="caption">Tur & Retur</Typography>}
                                    />
                                </RadioGroup>
                            </Box>
                        )}
                    </Box>
                </S.MobileListContainer>
            </Box>
        );
    }

    return (
        <Box>
            <S.DesktopPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <LocalFireDepartmentIcon color="action" />
                        <Box>
                            <Typography sx={{ fontWeight: "bold" }}>Ved</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceVed} kr / st
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton disabled={data.firewood === 0} onClick={() => updateField("firewood", data.firewood - 1)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: "bold", minWidth: 20 }}>{data.firewood}</Typography>
                        <IconButton onClick={() => updateField("firewood", data.firewood + 1)}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </S.DesktopPaper>

            <S.DesktopPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <SpaIcon color="action" />
                        <Box>
                            <Typography sx={{ fontWeight: "bold" }}>Doftpaket</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceDoft} kr / st
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton disabled={data.scent === 0} onClick={() => updateField("scent", data.scent - 1)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: "bold", minWidth: 20 }}>{data.scent}</Typography>
                        <IconButton onClick={() => updateField("scent", data.scent + 1)}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </S.DesktopPaper>

            <S.DesktopPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <CleaningServicesIcon color="action" />
                        <Box>
                            <Typography sx={{ fontWeight: "bold" }}>Slutstädning</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {priceCleaning} kr
                            </Typography>
                        </Box>
                    </Stack>
                    <Switch checked={data.cleaning} onChange={() => updateField("cleaning", !data.cleaning)} />
                </Stack>
            </S.DesktopPaper>

            <S.DesktopPaper>
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <LocalShippingIcon color="action" />
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Utkörning</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Startavgift {deliveryStartFee} kr
                                </Typography>
                            </Box>
                        </Stack>
                        <Switch checked={data.delivery} onChange={() => updateField("delivery", !data.delivery)} />
                    </Stack>
                    {data.delivery && (
                        <RadioGroup
                            row
                            value={data.transportType}
                            onChange={(e) => updateField("transportType", e.target.value as TransportType)}
                        >
                            <FormControlLabel value={TransportType.OneWay} control={<Radio />} label="Enkel resa" />
                            <FormControlLabel value={TransportType.Return} control={<Radio />} label="Tur & Retur" />
                        </RadioGroup>
                    )}
                </Stack>
            </S.DesktopPaper>
        </Box>
    );
};

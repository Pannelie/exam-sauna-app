import * as S from "../StepExtras/stepExtras.style.ts";
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

type CounterProps = {
    value: number;
    onAdd: () => void;
    onRemove: () => void;
};

export const StepExtras = ({ data, updateField }: StepExtrasProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { prices } = useBookingFormStore();

    const priceVed = prices?.firewood || 40;
    const priceDoft = prices?.scent || 30;
    const priceCleaning = prices?.cleaning || 995;
    const deliveryStartFee = prices?.deliveryStartFee || 1000;

    // Kompakt väljare (används nu på både mobil och desktop för enhetlig stil)
    const Counter = ({ value, onAdd, onRemove }: CounterProps) => (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
                bgcolor: "#f5f5f5",
                borderRadius: "20px",
                p: 0.5,
                border: "1px solid #e0e0e0",
            }}
        >
            <IconButton
                size="small"
                onClick={onRemove}
                disabled={value === 0}
                sx={{
                    bgcolor: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "#f0f0f0" },
                }}
            >
                <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ minWidth: 28, textAlign: "center", fontWeight: "bold" }}>
                {value}
            </Typography>
            <IconButton
                size="small"
                onClick={onAdd}
                sx={{
                    bgcolor: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "#f0f0f0" },
                }}
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Stack>
    );

    const extras = [
        {
            key: "firewood",
            title: "Ved",
            subtitle: `${priceVed} kr/st`,
            icon: <LocalFireDepartmentIcon sx={{ color: "#d35400", fontSize: 18 }} />,
            accent: "#f4b183",
            bg: "linear-gradient(180deg, #fff8f1 0%, #ffffff 100%)",
            action: (
                <Counter
                    value={data.firewood}
                    onAdd={() => updateField("firewood", data.firewood + 1)}
                    onRemove={() => updateField("firewood", data.firewood - 1)}
                />
            ),
        },
        {
            key: "scent",
            title: "Doftpaket",
            subtitle: `${priceDoft} kr/st`,
            icon: <SpaIcon sx={{ color: "#1d7f4e", fontSize: 18 }} />,
            accent: "#9bd3b0",
            bg: "linear-gradient(180deg, #f4fcf7 0%, #ffffff 100%)",
            action: (
                <Counter
                    value={data.scent}
                    onAdd={() => updateField("scent", data.scent + 1)}
                    onRemove={() => updateField("scent", data.scent - 1)}
                />
            ),
        },
        {
            key: "cleaning",
            title: "Städning",
            subtitle: `${priceCleaning} kr`,
            icon: <CleaningServicesIcon sx={{ color: "#2878b5", fontSize: 18 }} />,
            accent: "#a8d2ef",
            bg: "linear-gradient(180deg, #f3f9fe 0%, #ffffff 100%)",
            action: <Switch size="small" checked={data.cleaning} onChange={() => updateField("cleaning", !data.cleaning)} />,
        },
        {
            key: "delivery",
            title: "Utkörning",
            subtitle: `Startavgift ${deliveryStartFee} kr + milersättning`,
            icon: <LocalShippingIcon sx={{ color: "#2f4152", fontSize: 18 }} />,
            accent: "#b7c4d1",
            bg: "linear-gradient(180deg, #f7f9fb 0%, #ffffff 100%)",
            action: <Switch size="small" checked={data.delivery} onChange={() => updateField("delivery", !data.delivery)} />,
        },
    ];

    return (
        <Box sx={{ width: "100%", py: { xs: 2, md: 0.25 } }}>
            {isMobile ? (
                <S.MobileListContainer
                    sx={{
                        maxWidth: "100%",
                        margin: "0",
                        backgroundColor: "#fff",
                        borderRadius: { xs: 0, md: "12px" },
                        boxShadow: { xs: "none", md: "0 4px 12px rgba(0,0,0,0.05)" },
                        overflow: "hidden",
                    }}
                >
                    <S.ListRow>
                        <Stack direction="row" alignItems="center" spacing={2}>
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

                    <S.ListRow>
                        <Stack direction="row" alignItems="center" spacing={2}>
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

                    <S.ListRow>
                        <Stack direction="row" alignItems="center" spacing={2}>
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

                    <Box
                        sx={{
                            p: { xs: 2, md: 1.25 },
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <S.IconWrapper>
                                    <LocalShippingIcon sx={{ color: "#34495e" }} />
                                </S.IconWrapper>
                                <Stack>
                                    <Typography variant="body2" fontWeight="bold">
                                        Utkörning
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Startavgift {deliveryStartFee} kr + milersättning
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Switch size="small" checked={data.delivery} onChange={() => updateField("delivery", !data.delivery)} />
                        </Stack>

                        {data.delivery && (
                            <Box
                                sx={{
                                    mt: { xs: 2, md: 1 },
                                    p: { xs: 0.75, md: 0.5 },
                                    bgcolor: "#f9f9f9",
                                    borderRadius: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <RadioGroup
                                    row
                                    value={data.transportType || TransportType.OneWay}
                                    onChange={(e) => updateField("transportType", e.target.value as TransportType)}
                                    sx={{
                                        gap: { xs: 1, md: 0.5 },
                                    }}
                                >
                                    <FormControlLabel
                                        value={TransportType.OneWay}
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography variant="caption" sx={{ fontSize: "0.72rem", lineHeight: 1.1 }}>
                                                Enkel resa
                                            </Typography>
                                        }
                                        sx={{
                                            m: 0,
                                            mr: { xs: 1, md: 0.75 },
                                            "& .MuiRadio-root": { p: 0.25 },
                                            "& .MuiSvgIcon-root": { fontSize: 17 },
                                        }}
                                    />
                                    <FormControlLabel
                                        value={TransportType.Return}
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography variant="caption" sx={{ fontSize: "0.72rem", lineHeight: 1.1 }}>
                                                Tur & Retur
                                            </Typography>
                                        }
                                        sx={{
                                            m: 0,
                                            "& .MuiRadio-root": { p: 0.25 },
                                            "& .MuiSvgIcon-root": { fontSize: 17 },
                                        }}
                                    />
                                </RadioGroup>
                            </Box>
                        )}
                    </Box>
                </S.MobileListContainer>
            ) : (
                <Stack spacing={1}>
                    <S.DesktopExtrasGrid>
                        {extras.map((item) => (
                            <S.DesktopExtraCard
                                key={item.key}
                                sx={{
                                    gridColumn: item.key === "firewood" || item.key === "scent" ? "auto" : "1 / -1",
                                    borderColor: "rgba(0,0,0,0.1)",
                                    background: item.bg,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {item.icon && (
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: "8px",
                                                bgcolor: "#fff",
                                                border: `1px solid ${item.accent}`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                                            }}
                                        >
                                            {item.icon}
                                        </Box>
                                    )}

                                    <Stack spacing={0.25}>
                                        <Typography variant="body2" fontWeight="bold" lineHeight={1.2}>
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            lineHeight={1.2}
                                            sx={{
                                                display: "inline-flex",
                                                width: "fit-content",
                                                px: 0.75,
                                                py: 0.125,
                                                borderRadius: "999px",
                                                bgcolor: "rgba(255,255,255,0.8)",
                                                border: `1px solid ${item.accent}`,
                                            }}
                                        >
                                            {item.subtitle}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {item.action}
                            </S.DesktopExtraCard>
                        ))}
                    </S.DesktopExtrasGrid>

                    {data.delivery && (
                        <Box
                            sx={{
                                p: 0.5,
                                bgcolor: "#f9f9f9",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <RadioGroup
                                row
                                value={data.transportType || TransportType.OneWay}
                                onChange={(e) => updateField("transportType", e.target.value as TransportType)}
                                sx={{ gap: 0.5 }}
                            >
                                <FormControlLabel
                                    value={TransportType.OneWay}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="caption" sx={{ fontSize: "0.72rem", lineHeight: 1.1 }}>
                                            Enkel resa
                                        </Typography>
                                    }
                                    sx={{
                                        m: 0,
                                        mr: 0.75,
                                        "& .MuiRadio-root": { p: 0.25 },
                                        "& .MuiSvgIcon-root": { fontSize: 17 },
                                    }}
                                />
                                <FormControlLabel
                                    value={TransportType.Return}
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography variant="caption" sx={{ fontSize: "0.72rem", lineHeight: 1.1 }}>
                                            Tur & Retur
                                        </Typography>
                                    }
                                    sx={{
                                        m: 0,
                                        "& .MuiRadio-root": { p: 0.25 },
                                        "& .MuiSvgIcon-root": { fontSize: 17 },
                                    }}
                                />
                            </RadioGroup>
                        </Box>
                    )}
                </Stack>
            )}
        </Box>
    );
};

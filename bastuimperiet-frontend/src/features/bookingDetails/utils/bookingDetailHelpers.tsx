import { CheckCircle, HourglassEmpty, Cancel, Block } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { BookingStatus } from "../../../types/bookingTypes";

export const getStatusChip = (status: BookingStatus) => {
    const config = {
        [BookingStatus.Confirmed]: { label: "Bekräftad", color: "success", icon: <CheckCircle fontSize="small" /> },
        [BookingStatus.Pending]: { label: "Väntar", color: "warning", icon: <HourglassEmpty fontSize="small" /> },
        [BookingStatus.Declined]: { label: "Nekad", color: "error", icon: <Block fontSize="small" /> },
        [BookingStatus.Cancelled]: { label: "Avbokad", color: "default", icon: <Cancel fontSize="small" /> },
    };
    const { label, color, icon } = config[status];
    return <Chip icon={icon} label={label} color={color as any} size="small" variant="outlined" />;
};

// En enkel, återanvändbar komponent för att visa ett tillval med ikon
export const InfoTile = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
    <Box
        sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 1.5,
            minWidth: 120,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            bgcolor: "action.hover", // En lätt bakgrundsfärg för att markera dem
        }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            {icon}
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                {label}
            </Typography>
        </Stack>
        <Typography variant="body2" fontWeight="medium">
            {value}
        </Typography>
    </Box>
);

// Hjälpkomponent för Systemstatus (små prickar)
export const StatusIndicator = ({ label, active }: { label: string; active: boolean | null }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <Box
            sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: active === true ? "success.main" : active === false ? "error.main" : "warning.main",
                boxShadow: active !== null ? "0 0 4px" + (active ? "#2e7d3280" : "#d32f2f80") : "none", // En liten aura
            }}
        />
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
    </Stack>
);

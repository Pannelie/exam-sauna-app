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

// Hjälpkomponent för Systemstatus (små prickar)
export const StatusIndicator = ({ label, active }: { label: string; active: boolean | null }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <Box
            sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: active === true ? "success.main" : active === false ? "error.main" : "warning.main",
                boxShadow: active !== null ? "0 0 4px" + (active ? "#2e7d3280" : "#d32f2f80") : "none",
            }}
        />
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
    </Stack>
);

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("sv-SE", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
};

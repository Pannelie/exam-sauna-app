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

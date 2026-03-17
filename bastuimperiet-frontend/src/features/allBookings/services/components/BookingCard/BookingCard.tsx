import { Paper, styled, Box, Stack, Typography, Tooltip, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { iBookingCard } from "../../../../../types/bookingTypes";
import { useNavigate, useParams } from "react-router-dom";

const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "statusColor" && prop !== "isActive",
})<{ statusColor: string; isActive: boolean }>(({ theme, statusColor, isActive }) => ({
    padding: theme.spacing(2, 3), // Något mindre vertikal padding
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // Sprid ut elementen: Topp, Mitten, Botten
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    // --- NY LOGIK FÖR HÖJD ---
    minHeight: "160px", // Bas-höjd för alla kort
    height: "auto",
    width: "100%",

    backgroundColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    borderTop: `8px solid ${statusColor}`,
    border: isActive ? `2px solid #f0c05a` : "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",

    "&:hover": {
        transform: "scale(1.02) translateY(-4px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },
}));

interface BookingCardProps {
    booking: iBookingCard;
    onHover?: (id: string | null) => void;
    onConfirm?: (id: string) => void;
    onDecline?: (id: string) => void;
}

export const BookingCard = ({ booking, onHover, onConfirm, onDecline }: BookingCardProps) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isActive = id === String(booking.id);

    const getStatusColor = () => {
        if (booking.status === "confirmed") return "#4CAF50";
        if (booking.status === "pending") return "#FFC107";
        if (booking.status === "cancelled") return "#D32F2F";
        return "#e0e0e0";
    };

    const getStatusText = () => {
        if (booking.status === "confirmed") return "Bekräftad";
        if (booking.status === "cancelled") return "Avbokad";
        return "Nekad";
    };

    return (
        <StyledPaper
            elevation={0}
            isActive={isActive}
            statusColor={getStatusColor()}
            onClick={() => navigate(`/admin/bookings/${booking.id}`)}
            onMouseEnter={() => onHover?.(String(booking.id))}
            onMouseLeave={() => onHover?.(null)}
        >
            {/* TOPP: Den lilla status-indikatorn */}
            <Box
                sx={{
                    width: "40px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: getStatusColor(),
                    mb: 1,
                }}
            />

            {/* MITTEN: ID och Datum (centrerat vertikalt genom flex-grow) */}
            <Box sx={{ textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "1.1rem" }}>
                    #{booking.id}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.85rem" }}>
                    {new Date(booking.startDate).toLocaleDateString("sv-SE")}
                    {" — "}
                    {new Date(booking.endDate).toLocaleDateString("sv-SE")}
                </Typography>
            </Box>

            {/* BOTTEN: Knappar ELLER Status-etikett */}
            <Box sx={{ mt: 2, minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                {booking.status === "pending" ? (
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Bekräfta bokning" arrow>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onConfirm?.(String(booking.id));
                                }}
                                sx={{
                                    color: "#4CAF50",
                                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.2)" },
                                }}
                            >
                                <CheckCircleIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Neka bokning" arrow>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDecline?.(String(booking.id));
                                }}
                                sx={{
                                    color: "#D32F2F",
                                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                                    "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.2)" },
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ) : (
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 900,
                            color: getStatusColor(),
                            textTransform: "uppercase",
                            letterSpacing: "1.5px", // Ger en "label"-känsla
                            opacity: 0.8, // Gör den mindre dominant än knapparna
                        }}
                    >
                        {getStatusText()}
                    </Typography>
                )}
            </Box>
        </StyledPaper>
    );
};

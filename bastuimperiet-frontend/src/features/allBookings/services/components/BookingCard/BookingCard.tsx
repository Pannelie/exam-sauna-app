import { Paper, styled, Box, Stack, Typography, Button } from "@mui/material";
import type { iBookingCard } from "../../../../../types/bookingTypes";
import { useNavigate, useParams } from "react-router-dom";

const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "statusColor" && prop !== "isActive",
})<{ statusColor: string; isActive: boolean }>(({ theme, statusColor, isActive }) => ({
    padding: theme.spacing(3),
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.5rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    // --- VIKTIGT: Fast höjd så de inte ändrar form ---
    height: "200px",
    width: "100%", // Ta bort "280px", låt Gridden bestämma bredden!

    backgroundColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    borderTop: `8px solid ${statusColor}`,
    border: isActive ? `2px solid #f0c05a` : "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",

    // För att knapparna inte ska flytta på texten när de visas:
    "& .action-stack": {
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.2s ease",
        transform: "translateY(10px)",
    },

    "&:hover": {
        transform: "scale(1.03) translateY(-4px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        "& .action-stack": {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
        },
    },
}));

const StyledStack = styled(Stack)({
    marginTop: "auto", // Tryck stacken till botten av kortet
});

export const BookingCard = ({ booking, onHover }: { booking: iBookingCard; onHover?: (id: string | null) => void }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isActive = id === String(booking.id);

    const getStatusColor = () => {
        if (booking.status === "confirmed") return "#4CAF50";
        if (booking.status === "pending") return "#FFC107";
        if (booking.status === "cancelled") return "#D32F2F";
        return "#e0e0e0";
    };

    return (
        <StyledPaper
            elevation={0}
            isActive={isActive}
            statusColor={getStatusColor()}
            onClick={() => navigate(`/bookings/${booking.id}`)} // Återinförd navigate
            onMouseEnter={() => onHover?.(String(booking.id))} // Återinförd onHover
            onMouseLeave={() => onHover?.(null)}
        >
            {/* Liten modern status-indikator överst */}
            <Box
                sx={{
                    width: "40px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: getStatusColor(),
                    mb: 2,
                }}
            />

            <Box sx={{ textAlign: "center" }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontSize: "1.1rem",
                    }}
                >
                    #{booking.id}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                    {new Date(booking.startDate).toLocaleDateString("sv-SE")}
                    {" — "}
                    {new Date(booking.endDate).toLocaleDateString("sv-SE")}
                </Typography>
            </Box>

            {booking.status === "pending" && (
                <StyledStack className="action-stack" direction="row" spacing={1.5} alignItems="center">
                    <Button
                        size="small"
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: "20px", textTransform: "none", px: 3 }}
                        onClick={(e) => {
                            e.stopPropagation(); // Hindrar navigering till detaljvyn
                            console.log("Confirm", booking.id);
                        }}
                    >
                        Bekräfta
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ borderRadius: "20px", textTransform: "none", px: 3 }}
                        onClick={(e) => {
                            e.stopPropagation(); // Hindrar navigering till detaljvyn
                            console.log("Decline", booking.id);
                        }}
                    >
                        Avböj
                    </Button>
                </StyledStack>
            )}
        </StyledPaper>
    );
};

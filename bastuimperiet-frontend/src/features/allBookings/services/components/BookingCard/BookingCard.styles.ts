import { styled, Paper, Box, IconButton, Typography } from "@mui/material";

export const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "statusColor" && prop !== "isActive",
})<{ statusColor: string; isActive: boolean }>(({ theme, statusColor, isActive }) => ({
    padding: theme.spacing(2, 3),
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: "160px",
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

export const TopIndicator = styled(Box)<{ statusColor: string }>(({ statusColor }) => ({
    width: "40px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: statusColor,
    marginBottom: "8px",
}));

export const ContentBox = styled(Box)({
    textAlign: "center",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

export const ActionWrapper = styled(Box)({
    marginTop: "16px",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
});

export const StatusLabel = styled(Typography)<{ statusColor: string }>(({ statusColor }) => ({
    fontWeight: 900,
    color: statusColor,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    opacity: 0.8,
    fontSize: "0.75rem",
}));

export const ActionButton = styled(IconButton)<{ actionType: "confirm" | "decline" }>(({ actionType }) => ({
    color: actionType === "confirm" ? "#4CAF50" : "#D32F2F",
    backgroundColor: actionType === "confirm" ? "rgba(76, 175, 80, 0.1)" : "rgba(211, 47, 47, 0.1)",
    "&:hover": {
        backgroundColor: actionType === "confirm" ? "rgba(76, 175, 80, 0.2)" : "rgba(211, 47, 47, 0.2)",
    },
}));

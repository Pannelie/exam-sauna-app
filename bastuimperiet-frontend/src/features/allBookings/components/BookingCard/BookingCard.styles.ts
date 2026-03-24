import { styled, Paper, Box, Typography } from "@mui/material";

const slotProps = ["isActive", "statusColor"];

export const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => !slotProps.includes(prop as string),
})<{ isActive: boolean; statusColor: string }>(({ isActive, statusColor }) => ({
    padding: "16px",
    marginBottom: "8px",
    cursor: "pointer",
    borderLeft: `6px solid ${statusColor}`,
    background: isActive ? "#fdf5f0" : "#fff",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
        transform: "translateX(4px)",
        background: "#fafafa",
    },
}));

export const ContentBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
});

export const ActionWrapper = styled(Box)({
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
});

export const StatusLabel = styled(Typography, {
    shouldForwardProp: (prop) => !slotProps.includes(prop as string),
})<{ statusColor: string }>(({ statusColor }) => ({
    fontWeight: 900,
    color: statusColor,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    opacity: 0.8,
    fontSize: "0.75rem",
}));

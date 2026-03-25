import { Box, styled } from "@mui/material";

export const StyledList = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ isMobile }) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)",
    gap: "2rem",
    overflowY: "auto",
}));

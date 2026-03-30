import { Paper, styled } from "@mui/material";

export const StyledProfileCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "active" && prop !== "isMobile",
})<{ active?: boolean; isMobile?: boolean }>(({ active, isMobile }) => ({
    backgroundColor: active ? "rgba(240, 192, 90, 0.6)" : "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(6px)",
    padding: isMobile ? "1rem .6rem" : "2rem",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    width: "100%",
    boxShadow: "none",
    border: active ? "2px solid #f0c05a" : "none",
}));

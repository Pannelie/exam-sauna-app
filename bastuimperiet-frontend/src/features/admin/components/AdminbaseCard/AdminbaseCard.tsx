import { Paper, styled } from "@mui/material";

export const AdminBaseCard = styled(Paper)<{ active?: boolean }>(({ active }) => ({
    backgroundColor: active ? "rgba(240, 192, 90, 0.6)" : "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(6px)",
    padding: "30px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    boxShadow: "none",
    border: active ? "2px solid #f0c05a" : "none",
}));

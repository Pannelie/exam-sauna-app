import { Paper, styled, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const StyledProfileCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "active" && prop !== "isMobile",
})<{ active?: boolean; isMobile?: boolean }>(({ active, isMobile }) => ({
    position: "relative",
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

export const EditButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#4a1a1a",
}));

export const ProfileAvatar = styled(AccountCircleIcon)(({ theme }) => ({
    fontSize: 80,
    color: "#4a1a1a",
    marginBottom: theme.spacing(1),
}));

export const AdminName = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#4a1a1a",
});

export const AdminEmail = styled(Typography)({
    fontSize: "0.9rem",
    color: "#4a1a1a",
});

export const AdminPhone = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    color: "#4a1a1a",
    marginTop: theme.spacing(2),
}));

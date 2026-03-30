import { styled, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const DropdownCard = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    right: 0,
    width: "250px",
    backgroundColor: "#632B2B", // Färgen från din bild
    color: "white",
    padding: theme.spacing(3),
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "20px",
    zIndex: 10,
    gap: theme.spacing(0.5),
}));

export const StyledAccountIcon = styled(AccountCircleIcon)(({ theme }) => ({
    fontSize: 60,
    marginBottom: theme.spacing(1),
}));

export const ProfileName = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: "bold",
});

export const ProfileEmail = styled(Typography)({
    opacity: 0.8,
});

export const ProfilePhone = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    marginBottom: theme.spacing(2),
}));

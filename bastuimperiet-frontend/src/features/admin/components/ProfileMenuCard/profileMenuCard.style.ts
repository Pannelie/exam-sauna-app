import { styled, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const DropdownCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile?: boolean }>(({ theme, $isMobile }) => ({
    position: $isMobile ? "static" : "absolute",
    top: $isMobile ? "auto" : "100%",
    right: $isMobile ? "auto" : 0,
    width: $isMobile ? "100%" : "250px",
    maxWidth: $isMobile ? "210px" : "250px",
    backgroundColor: "#632B2B", // Färgen från din bild
    color: "white",
    padding: theme.spacing($isMobile ? 1.5 : 3),
    display: $isMobile ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: $isMobile ? "16px" : "20px",
    zIndex: 10,
    gap: theme.spacing($isMobile ? 0.25 : 0.5),
}));

export const StyledAccountIcon = styled(AccountCircleIcon, {
    shouldForwardProp: (prop) => prop !== "$isMobile",
})<{ $isMobile?: boolean }>(({ theme, $isMobile }) => ({
    fontSize: $isMobile ? 42 : 60,
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
    marginBottom: theme.spacing(1.25),
}));

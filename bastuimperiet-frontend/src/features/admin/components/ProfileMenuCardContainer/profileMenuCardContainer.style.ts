import { Box, Paper, styled } from "@mui/material";

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
}));

export const UserWrapper = styled(Box)({
    position: "relative",
    display: "inline-block",
    "&:hover .dropdown-card": {
        display: "flex",
    },
});

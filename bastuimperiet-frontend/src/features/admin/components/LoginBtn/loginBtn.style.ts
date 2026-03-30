import { Button, styled } from "@mui/material";

export const StyledLoginButton = styled(Button)(({ theme }) => ({
    bgcolor: "#E9B85B",
    color: "white",
    borderRadius: "15px",
    fontFamily: theme.typography.button.fontFamily,
    gap: theme.spacing(1),
    fontSize: "1.4rem",
    px: 4,
    marginTop: "1rem",
    "&:hover": { bgcolor: "#d4a74a" },
}));

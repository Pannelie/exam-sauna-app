import { styled, Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&:disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
    },
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    fontWeight: "bold",
    textTransform: "none",
}));

import { styled } from "@mui/material";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
    },
}));

import { styled } from "@mui/material";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        borderRadius: "24px",
        padding: theme.spacing(3),
        maxWidth: "480px",
        width: "100%",
        height: "auto",
        maxHeight: "80%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
    },
}));

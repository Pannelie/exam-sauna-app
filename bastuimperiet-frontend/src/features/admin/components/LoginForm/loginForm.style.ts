import { Button, Paper, TextField, Typography, styled } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const StyledFormContainer = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    maxWidth: "400px",
});

export const GlassPaper = styled(Paper)(({}) => ({
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(4px)",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
}));

export const LoginIcon = styled(AccountCircleIcon)(({ theme }) => ({
    fontSize: 100,
    color: "#4a1a1a",
    marginBottom: theme.spacing(3),
}));

export const StyledInput = styled(TextField)({
    marginBottom: "15px",
    "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        borderRadius: "8px",
        "& fieldset": { border: "2px solid #4a1a1a" },
        "&.Mui-focused fieldset": { borderColor: "#4a1a1a" },
    },
    "& input": {
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
});

export const ErrorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    width: "100%",
    textAlign: "center",
}));

export const YellowButton = styled(Button)({
    backgroundColor: "#f0c05a",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.4rem",
    padding: "12px 60px",
    borderRadius: "15px",
    marginTop: "20px",
    boxShadow: "0px 4px 0px #d0a040",
    "&:hover": { backgroundColor: "#e0b04a" },
    "&:disabled": { backgroundColor: "#ccc" },
});

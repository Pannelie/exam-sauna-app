import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: 700,
        },
        h6: {
            fontSize: "1.2rem",
            fontWeight: 600,
        },
    },
    palette: {
        primary: {
            main: "#E9B85C",
            light: "#FFC247",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#4C2223",
            contrastText: "#ffffff",
        },

        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },

        text: {
            primary: "#000000",
            secondary: "#4C2223",
        },
    },
});

export default theme;

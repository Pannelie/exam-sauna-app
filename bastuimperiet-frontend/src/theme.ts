import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "var(--font-primary)",
        h1: {
            fontFamily: "var(--font-secondary)",
            fontSize: "3rem",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "var(--font-secondary)",
        },
        h3: {
            fontFamily: "var(--font-primary)",
        },
        h4: {
            fontFamily: "var(--font-secondary)",
            fontSize: "1.5rem",
        },
        h6: {
            fontFamily: "var(--font-secondary)",
            fontSize: "1.2rem",
            fontWeight: 600,
        },
        body1: {
            fontFamily: "var(--font-primary)",
        },
        button: {
            fontFamily: "var(--font-accent), 'Koulen', sans-serif", // knappar med tredje fonten
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

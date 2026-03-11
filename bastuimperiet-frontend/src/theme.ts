import { createTheme } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        primary: {
            main: "var(--yellow)",
            light: "var(--yellow-hover)",
            contrastText: "var(--white)",
        },
        secondary: {
            main: "var(--dark-red)",
            contrastText: "var(--white)",
        },

        background: {
            default: "var(--light-grey)",
            paper: "var(--white)",
        },
        common: {
            white: "var(--white)",
        },

        text: {
            primary: "var(--dark)",
            secondary: "var(--dark-red)",
        },
    },
});

theme = createTheme(theme, {
    typography: {
        fontFamily: "var(--font-primary)",
        fontSize: "1.3rem",
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
            fontWeight: 800,
        },
        button: {
            fontFamily: "var(--font-accent), 'Koulen', sans-serif",
        },
    },
});

export default theme;

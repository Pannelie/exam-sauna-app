import { createTheme } from "@mui/material/styles";

const colors = {
    yellow: "#e9b85c",
    yellowHover: "#ffc247",
    darkRed: "#4c2223",
    white: "#ffffff",
    lightGrey: "#f5f5f5",
    dark: "#000000",
};

let theme = createTheme({
    palette: {
        primary: {
            main: colors.yellow,
            light: colors.yellowHover,
        },
        secondary: {
            main: colors.darkRed,
        },

        background: {
            default: colors.lightGrey,
            paper: colors.white,
        },
        common: {
            white: colors.white,
        },

        text: {
            primary: colors.dark,
            secondary: colors.darkRed,
        },
    },
});

theme = createTheme(theme, {
    typography: {
        fontFamily: "var(--font-primary)",
        fontSize: "1.3rem",
        h1: {
            fontFamily: "var(--font-secondary)",
            fontSize: "2.8rem",
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
        body2: {
            fontFamily: "var(--font-primary)",
        },
        button: {
            fontFamily: "var(--font-accent), 'Koulen', sans-serif",
        },
    },
});

export default theme;

import { styled, Typography } from "@mui/material";
import MenuBar from "../components/MenuBar/MenuBar";
import Hero from "../components/Hero/Hero";

const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
    [theme.breakpoints.up("md")]: {
        paddingBottom: 0,
    },
}));

const Section = styled("section")(({ theme }) => ({
    minHeight: "70vh",
    padding: theme.spacing(8, 4),
    scrollMarginTop: theme.spacing(12),
}));

export const HomePage = () => {
    return (
        <StyledDiv>
            <Hero />
            <MenuBar />
            <Section id="info">
                <Typography variant="h4">Info</Typography>
            </Section>
            <Section id="priser">
                <Typography variant="h4">Priser</Typography>
            </Section>
            <Section id="kontakt">
                <Typography variant="h4">Kontakt</Typography>
            </Section>
            <Section id="booking">
                <Typography variant="h4">Boka</Typography>
            </Section>
        </StyledDiv>
    );
};

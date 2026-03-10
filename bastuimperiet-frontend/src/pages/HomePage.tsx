import { styled, Typography } from "@mui/material";
import MenuBar from "../components/MenuBar";

const StyledDiv = styled("div")({
    display: "flex",
    flexDirection: "column",
});

const Section = styled("section")(({ theme }) => ({
    minHeight: "70vh",
    padding: theme.spacing(8, 4),
    scrollMarginTop: theme.spacing(12),
}));

export const HomePage = () => {
    return (
        <StyledDiv>
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

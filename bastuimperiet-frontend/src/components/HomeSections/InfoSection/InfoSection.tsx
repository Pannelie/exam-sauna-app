import { Box, Paper, Typography, styled } from "@mui/material";
import { Carousel } from "../../Carousel/Carousel";

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "3rem",
    width: "100%",
    padding: "6rem 2rem",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "3rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
        fontSize: "1.8rem",
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    flex: 1,
    width: "100%",
    padding: "3rem",
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "1.5rem",
    [theme.breakpoints.down("md")]: {
        padding: "1.5rem",
        gap: ".5rem",
    },
}));

export const InfoSection = () => {
    return (
        <StyledBox id="info">
            {/* Carousel */}
            <Carousel />

            {/* Info Paper */}
            <StyledPaper elevation={6}>
                <StyledTypography variant="h3" gutterBottom>
                    Välkommen till Bastuimperiet!
                </StyledTypography>
                <Typography variant="body2">
                    Här kan du hyra en vedeldad bastu på släp och njuta av en härlig bastuupplevelse ute i naturen. Med vår bastu tar du dig
                    enkelt till dina favoritplatser vid sjön, stugan eller vart du vill.
                </Typography>
            </StyledPaper>
        </StyledBox>
    );
};

import { Box, Paper, Typography, styled } from "@mui/material";
import { Carousel } from "../../Carousel";

export const InfoSection = () => {
    const StyledBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "48px", // stort mellanrum mellan carousel och paper
        padding: "6rem 2rem",
        flexDirection: "column", // default: kolumn på mobil
        [theme.breakpoints.up("md")]: {
            flexDirection: "row", // rad på desktop
        },
    }));

    return (
        <StyledBox id="info">
            {/* Carousel */}
            <Box
                className="carousel_container"
                sx={{
                    flex: 1, // tar upp lika mycket plats som Paper
                    maxWidth: "600px", // begränsar maxbredd
                    width: "100%", // säkerställer att Swiper fyller boxen
                }}
            >
                <Carousel />
            </Box>

            {/* Info Paper */}
            <Paper
                elevation={6}
                sx={{
                    flex: 1, // tar upp lika mycket plats som carousel
                    maxWidth: "600px",
                    width: "100%", // fyller flex-boxen
                    padding: "3rem",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography variant="h3" gutterBottom fontWeight="bold">
                    Välkommen till Bastuimperiet!
                </Typography>
                <Typography>
                    Här kan du hyra en vedeldad bastu på släp och njuta av en härlig bastuupplevelse ute i naturen. Med vår bastu tar du dig
                    enkelt till dina favoritplatser vid sjön, stugan eller vart du vill.
                </Typography>
            </Paper>
        </StyledBox>
    );
};

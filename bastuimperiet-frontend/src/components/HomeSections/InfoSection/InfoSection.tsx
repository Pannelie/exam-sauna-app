import { Box, Paper, Typography, styled } from "@mui/material";
import { Carousel } from "../../Carousel";

export const InfoSection = () => {
    const StyledBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        padding: "6rem 2rem",
        [theme.breakpoints.up("md")]: {
            flexDirection: "row",
        },
    }));

    return (
        <StyledBox id="info">
            <Box className="carousel_container">
                <Carousel />
            </Box>
            <Paper
                elevation={6}
                sx={{
                    padding: "3rem",
                    maxWidth: "600px",
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

import { useEffect, useState } from "react";
import logo from "../../assets/hero.webp";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { Typography, styled, useMediaQuery, useTheme, Box } from "@mui/material";

// Motsvarar .hero_section
const HeroSection = styled("section")(({ theme }) => ({
    position: "relative",
    display: "flex",
    overflow: "hidden",
    // Desktop-höjd baserat på din CSS
    minHeight: "calc(100vh - var(--menubar-height, 80px))",
    [theme.breakpoints.down("md")]: {
        height: "100vh", // Full viewport height på mobil enligt din media query
    },
}));

// Motsvarar .hero_image, .hero_image--mobile/desktop
const HeroImage = styled("img")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    // Desktop position
    objectPosition: "center bottom",

    [theme.breakpoints.down("md")]: {
        // Mobil position från din CSS
        objectPosition: "60% bottom",
    },
}));

// Motsvarar .hero_overlay, .hero_overlay--mobile/desktop
const HeroContent = styled(Box)(({ theme }) => ({
    position: "absolute",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
        top: "18%",
        left: "5%", // Flyttar texten mer åt vänster
        textAlign: "left",
        padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
        top: "20%",
        left: "5%",
        maxWidth: "fit-content",
        gap: theme.spacing("2rem"), // Lite mer gap på mobil
        alignItems: "center", // Justera knappen mer åt vänster
    },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    // Hämtar din färg från temat eller skriv in den direkt (t.ex. #4A2C2A)
    color: theme.palette.secondary.main,
    fontWeight: 900,
    lineHeight: 1.1,
    // KONTRAST-TRICKET: En subtil ljus halo runt texten gör den läsbar mot grenar/himmel
    textShadow: `
    1px 1px 0px rgba(255,255,255,0.8),
    -1px -1px 0px rgba(255,255,255,0.8),
    1px -1px 0px rgba(255,255,255,0.8),
    -1px 1px 0px rgba(255,255,255,0.8),
    0px 0px 10px rgba(255,255,255,0.5)

  `,

    [theme.breakpoints.down("md")]: {
        fontSize: "2rem", // Mindre text för mobil enligt önskemål
        letterSpacing: "-0.01em",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
    },
}));

function Hero({ handleBookClick }: { handleBookClick: () => void }) {
    const [isBookingVisible, setIsBookingVisible] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (!isMobile) {
            setIsBookingVisible(false);
            return;
        }

        const bookingSection = document.getElementById("booking");
        if (!bookingSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsBookingVisible(entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: "0px 0px -70% 0px",
            },
        );

        observer.observe(bookingSection);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <HeroSection>
            <HeroContent>
                <StyledTitle variant={"h2"}>Din lugna stund med Bastuimperiet</StyledTitle>

                {!isMobile && <BookNowButton onClick={handleBookClick} styleVariant="heroDesktop" />}
            </HeroContent>

            <HeroImage src={logo} alt="Hero Image" />

            {isMobile && !isBookingVisible && <BookNowButton onClick={handleBookClick} styleVariant="heroMobile" />}
        </HeroSection>
    );
}

export default Hero;

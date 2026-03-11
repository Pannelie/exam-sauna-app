import "./hero.css";
import { useEffect, useState } from "react";
import logo from "../../assets/hero.png";
import signLogo from "../../assets/wood__logo.jpg";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { scrollToSection } from "../../utils/scrollToSection";
import { Typography, styled, useMediaQuery, useTheme } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
}));

function Hero() {
    const [isBookingVisible, setIsBookingVisible] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (!isMobile) {
            setIsBookingVisible(false);
            return;
        }

        const bookingSection = document.getElementById("booking");
        if (!bookingSection) {
            return;
        }

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

    const handleBookClick = () => {
        scrollToSection("booking");
    };

    return (
        <section className="hero_section">
            <div className={`hero_overlay ${isMobile ? "hero_overlay--mobile" : "hero_overlay--desktop"}`}>
                {isMobile ? (
                    <img src={signLogo} alt="Bastuimperiet skylt" className="hero_sign" />
                ) : (
                    <StyledTypography variant="h2" className="hero_title">
                        Välkommen till Bastuimperiet
                    </StyledTypography>
                )}
                {!isMobile && <BookNowButton onClick={handleBookClick} styleVariant="heroDesktop" />}
            </div>
            <img src={logo} alt="Hero Image" className={`hero_image ${isMobile ? "hero_image--mobile" : "hero_image--desktop"}`} />
            {isMobile && !isBookingVisible && <BookNowButton onClick={handleBookClick} styleVariant="heroMobile" />}
        </section>
    );
}

export default Hero;

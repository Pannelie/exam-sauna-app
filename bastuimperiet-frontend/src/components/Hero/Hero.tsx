import "./hero.css";
import { useEffect, useState } from "react";
import logo from "../../assets/hero.webp";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { Typography, styled, useMediaQuery, useTheme } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
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

    return (
        <section className="hero_section">
            <div className={`hero_overlay ${isMobile ? "hero_overlay--mobile" : "hero_overlay--desktop"}`}>
                <StyledTypography variant={isMobile ? "h4" : "h2"} className="hero_title">
                    Välkommen till Bastuimperiet
                </StyledTypography>

                {!isMobile && <BookNowButton onClick={handleBookClick} styleVariant="heroDesktop" />}
            </div>
            <img src={logo} alt="Hero Image" className={`hero_image ${isMobile ? "hero_image--mobile" : "hero_image--desktop"}`} />
            {isMobile && !isBookingVisible && <BookNowButton onClick={handleBookClick} styleVariant="heroMobile" />}
        </section>
    );
}

export default Hero;

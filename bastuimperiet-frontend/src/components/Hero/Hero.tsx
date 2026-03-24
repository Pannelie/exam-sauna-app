import { useEffect, useState } from "react";
import logo from "../../assets/hero.webp";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { useMediaQuery, useTheme } from "@mui/material";
import * as S from "./hero.style";

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
        <S.HeroSection>
            <S.HeroContent>
                <S.StyledTitle variant={"h2"}>Din lugna stund med Bastuimperiet</S.StyledTitle>

                {!isMobile && <BookNowButton onClick={handleBookClick} styleVariant="heroDesktop" />}
            </S.HeroContent>

            <S.HeroImage src={logo} alt="Hero Image" />

            {isMobile && !isBookingVisible && <BookNowButton onClick={handleBookClick} styleVariant="heroMobile" />}
        </S.HeroSection>
    );
}

export default Hero;

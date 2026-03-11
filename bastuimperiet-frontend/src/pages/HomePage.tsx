import { styled } from "@mui/material";
import MenuBar from "../components/MenuBar/MenuBar";
import Hero from "../components/Hero/Hero";
import { InfoSection } from "../components/HomeSections/InfoSection";
import { PricesSection } from "../components/HomeSections/PricesSection";
import { ContactSection } from "../components/HomeSections/ContactSection";
import { BookingSection } from "../components/HomeSections/BookingSection";

const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
    [theme.breakpoints.up("md")]: {
        paddingBottom: 0,
    },
}));

export const HomePage = () => {
    return (
        <StyledDiv>
            <Hero />
            <MenuBar />
            <div className="page_container--center">
                <InfoSection />
                <PricesSection />
                <ContactSection />
                <BookingSection />
            </div>
        </StyledDiv>
    );
};

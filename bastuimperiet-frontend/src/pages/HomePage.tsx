import MenuBar from "../components/MenuBar/MenuBar";
import Hero from "../components/Hero/Hero";
import { InfoSection } from "../components/HomeSections/InfoSection";
import { PricesSection } from "../components/HomeSections/PricesSection";
import { ContactSection } from "../components/HomeSections/ContactSection/ContactSection";
import { BookingSection } from "../components/HomeSections/BookingSection";
import "./page.css";

export const HomePage = () => {
    return (
        <main className="home_main">
            <Hero />
            <MenuBar />
            <div className="page_container--center">
                <InfoSection />
                <PricesSection />
                <ContactSection />
                <BookingSection />
            </div>
        </main>
    );
};

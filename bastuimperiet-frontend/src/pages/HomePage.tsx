import { useEffect } from "react";
import { useBookingStore } from "../features/booking/stores/useBookingStore";
import MenuBar from "../components/MenuBar/MenuBar";
import Hero from "../components/Hero/Hero";
import { InfoSection } from "../components/HomeSections/InfoSection/InfoSection";
import { PricesSection } from "../components/HomeSections/PricesSection";
import { ContactSection } from "../components/HomeSections/ContactSection/ContactSection";
import { BookingSection } from "../features/booking/BookingSection";
import { scrollToSection } from "../utils/scrollToSection";
import { BookNowButton } from "../components/BookNowButton/BookNowButton";
import "./page.css";

export const HomePage = () => {
    const fetchPrices = useBookingStore((state) => state.fetchPrices);

    useEffect(() => {
        fetchPrices();
    }, [fetchPrices]);

    const publicItems = [
        { label: "Info", onClick: () => scrollToSection("info") },
        { label: "Priser", onClick: () => scrollToSection("priser") },
        { label: "Kontakt", onClick: () => scrollToSection("kontakt") },
    ];

    const handleBookClick = () => scrollToSection("booking");

    return (
        <main className="home_main">
            <Hero />
            <MenuBar menuItems={publicItems} actionComponent={<BookNowButton onClick={handleBookClick} />} />
            <div className="page_container--center">
                <InfoSection />
                <PricesSection />
                <ContactSection />
                <BookingSection />
            </div>
        </main>
    );
};

import { useEffect, useRef } from "react";
import { useBookingFormStore } from "../stores/useBookingFormStore";
import MenuBar from "../components/MenuBar/MenuBar";
import Hero from "../components/Hero/Hero";
import { InfoSection } from "../components/HomeSections/InfoSection/InfoSection";
import { PricesSection } from "../components/HomeSections/PricesSection";
import { ContactSection } from "../components/HomeSections/ContactSection/ContactSection";
import { BookingSection } from "../components/HomeSections/BookingSection";
import { scrollToSection } from "../utils/scrollToSection";
import { BookNowButton } from "../components/BookNowButton/BookNowButton";
import "./page.css";
import { useCalendar } from "../features/calendar/hooks/useCalendar";

export const HomePage = () => {
    const fetchPrices = useBookingFormStore((state) => state.fetchPrices);
    useCalendar();
    useEffect(() => {
        fetchPrices();
    }, [fetchPrices]);

    const MENU_BAR_HEIGHT = 100;

    // Skapa refs för sektionerna
    const infoRef = useRef<HTMLElement>(null!);
    const priserRef = useRef<HTMLElement>(null!);
    const kontaktRef = useRef<HTMLElement>(null!);
    const bookingRef = useRef<HTMLElement>(null!);

    const publicItems = [
        { label: "Info", onClick: () => scrollToSection(infoRef, MENU_BAR_HEIGHT) },
        { label: "Priser", onClick: () => scrollToSection(priserRef, MENU_BAR_HEIGHT) },
        { label: "Kontakt", onClick: () => scrollToSection(kontaktRef, MENU_BAR_HEIGHT) },
    ];

    const handleBookClick = () => scrollToSection(bookingRef, MENU_BAR_HEIGHT);

    return (
        <main className="home_main">
            <Hero handleBookClick={handleBookClick} />
            <MenuBar menuItems={publicItems} actionComponent={<BookNowButton onClick={handleBookClick} />} />
            <div className="page_container--center">
                <InfoSection ref={infoRef} />
                <PricesSection ref={priserRef} />
                <ContactSection ref={kontaktRef} />
                <BookingSection ref={bookingRef} />
            </div>
        </main>
    );
};

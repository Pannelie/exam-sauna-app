import { MenuTitle } from "../../components/MenuTitle";
import { HomeSection } from "../../components/HomeSections/HomeSection/HomeSection";
import { BookingLayout } from "./components/BookingLayout/BookingLayout";

export function BookingSection() {
    return (
        <HomeSection id="booking">
            <MenuTitle title="Boka" />
            <BookingLayout />
        </HomeSection>
    );
}

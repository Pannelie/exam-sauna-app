import React from "react";
import { HomeSection } from "./HomeSection/HomeSection";
import { BookingLayout } from "../../features/booking/BookingLayout";

export const BookingSection = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <HomeSection id="booking" ref={ref}>
            <BookingLayout />
        </HomeSection>
    );
});

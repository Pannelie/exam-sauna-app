import React from "react";
import { HomeSection } from "./HomeSection/HomeSection";
import { BookingLayout } from "../../features/booking/BookingLayout";

export const BookingSection = React.forwardRef<HTMLElement>((__, ref) => {
    return (
        <HomeSection id="booking" ref={ref}>
            <BookingLayout />
        </HomeSection>
    );
});

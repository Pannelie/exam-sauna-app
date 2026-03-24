import { BookingLayout } from "../features/booking/BookingLayout";
import { useEffect } from "react";
import { useBookingFormStore } from "../stores/useBookingFormStore";

export const NewBookingPage = () => {
    const fetchPrices = useBookingFormStore((state) => state.fetchPrices);

    useEffect(() => {
        fetchPrices();
    }, [fetchPrices]);

    return <BookingLayout />;
};

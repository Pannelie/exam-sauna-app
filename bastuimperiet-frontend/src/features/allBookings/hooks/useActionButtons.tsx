// hooks/useBookingActions.ts
import { useState } from "react";
import { updateBookingStatus } from "../services/allBookingsService";
import { BookingStatus } from "../../../types/bookingTypes";

export const useBookingActions = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleConfirm = async (id: string) => {
        setIsUpdating(true);
        try {
            await updateBookingStatus(id, "confirmed" as BookingStatus);
            // Här vill du förmodligen trigga en uppdatering av listan,
            // t.ex. via en global state eller genom att navigera/refresh
            window.location.reload();
        } catch (error) {
            console.error("Kunde inte bekräfta:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDecline = async (id: string) => {
        setIsUpdating(true);
        try {
            await updateBookingStatus(id, "declined" as BookingStatus);
            window.location.reload();
        } catch (error) {
            console.error("Kunde inte neka:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return { handleConfirm, handleDecline, isUpdating };
};

// hooks/useBookingActions.ts
import { useState } from "react";
import { updateBookingStatus } from "../services/allBookingsService";
import { BookingStatus } from "../../../types/bookingTypes";
import type { ApiBookingData } from "../../../types/bookingTypes";

export const useBookingActions = (onSuccess?: () => void) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleConfirm = async (booking: ApiBookingData) => {
        const checkInDate = new Date(`${booking.startDate}T15:00:00`);
        const now = new Date();

        // 2. Om datumet har passerat, visa en bekräftelse-ruta
        if (checkInDate < now) {
            const proceed = window.confirm("Varning: Incheckningsdatumet har redan passerat. Vill du fortfarande bekräfta bokningen?");
            if (!proceed) return; // Avbryt här, anropet skickas aldrig
        }
        setIsUpdating(true);
        try {
            await updateBookingStatus(booking.id, "confirmed" as BookingStatus);
            // Här vill du förmodligen trigga en uppdatering av listan,
            // t.ex. via en global state eller genom att navigera/refresh
            if (onSuccess) {
                onSuccess();
            } else {
                // Fallback om du inte har hunnit implementera refetch överallt
                window.location.reload();
            }
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
            if (onSuccess) {
                onSuccess();
            } else {
                // Fallback om du inte har hunnit implementera refetch överallt
                window.location.reload();
            }
        } catch (error) {
            console.error("Kunde inte neka:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return { handleConfirm, handleDecline, isUpdating };
};

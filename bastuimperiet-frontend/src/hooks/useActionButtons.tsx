// hooks/useBookingActions.ts
import { useState } from "react";
import { updateBookingStatus } from "../features/allBookings/services/allBookingsService";
import { BookingStatus } from "../types/bookingTypes";
import type { ApiBookingData } from "../types/bookingTypes";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const useBookingActions = (onSuccess?: () => void) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingBooking, setPendingBooking] = useState<ApiBookingData | null>(null);
    const [dialogMessage, setDialogMessage] = useState("");
    const [forceMode, setForceMode] = useState(false);

    const handleConfirm = async (booking: ApiBookingData, force: boolean = false) => {
        const checkInDate = new Date(`${booking.startDate}T15:00:00`);
        const now = new Date();

        // Om datumet har passerat, visa en bekräftelse-ruta
        if (!force && checkInDate < now) {
            setDialogMessage("Varning: Incheckningsdatumet har redan passerat. Vill du fortfarande bekräfta bokningen?");
            setPendingBooking(booking);
            setForceMode(false);
            setDialogOpen(true);
            return;
        }
        setIsUpdating(true);
        try {
            await updateBookingStatus(booking.id, "confirmed" as BookingStatus, force);
            if (onSuccess) {
                onSuccess();
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            // Hantera 409/warning från backend
            if (error?.response?.status === 409 && error?.response?.data?.warning) {
                setDialogMessage(error.response.data.message + " Vill du bekräfta ändå?");
                setPendingBooking(booking);
                setForceMode(true);
                setDialogOpen(true);
                return;
            }
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

    // Dialog-komponent för bekräftelse och force
    const ConfirmDialog = () => (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Bekräfta åtgärd</DialogTitle>
            <DialogContent>{dialogMessage}</DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="inherit">
                    Avbryt
                </Button>
                <Button
                    onClick={async () => {
                        setDialogOpen(false);
                        if (pendingBooking) {
                            await handleConfirm(pendingBooking, true);
                        }
                    }}
                    color="primary"
                    autoFocus
                    disabled={isUpdating}
                >
                    Bekräfta ändå
                </Button>
            </DialogActions>
        </Dialog>
    );

    return { handleConfirm, handleDecline, isUpdating, ConfirmDialog };
};

import { useState } from "react";
import { updateBookingStatus } from "../features/allBookings/services/allBookingsService";
import { BookingStatus } from "../types/bookingTypes";
import type { ApiBookingData } from "../types/bookingTypes";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Tooltip, Stack, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as S from "../components/ActionButtons/ActionButtons.styles";

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
            onSuccess ? onSuccess() : window.location.reload();
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
            onSuccess ? onSuccess() : window.location.reload();
        } catch (error) {
            console.error("Kunde inte neka:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = async (id: string) => {
        setIsUpdating(true);
        try {
            await updateBookingStatus(id, "cancelled" as BookingStatus);
            onSuccess ? onSuccess() : window.location.reload();
        } catch (error) {
            console.error("Kunde inte avboka:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const ActionBtn = ({
        booking,
        type,
        title,
        label,
    }: {
        booking: ApiBookingData;
        type: "confirm" | "decline" | "cancelled";
        title: string;
        label?: string;
    }) => {
        const isLoading = isUpdating && pendingBooking?.id === booking.id;

        return (
            <Tooltip title={title} arrow>
                <S.ActionButton
                    actionType={type === "confirm" ? "confirm" : "decline"}
                    disabled={isUpdating}
                    onClick={(e) => {
                        e.stopPropagation();
                        setPendingBooking(booking); // KRITISKT FÖR FORCE
                        if (type === "confirm") handleConfirm(booking);
                        if (type === "decline") handleDecline(String(booking.id));
                        if (type === "cancelled") handleCancel(String(booking.id));
                    }}
                    sx={label ? { width: "auto", px: 2, borderRadius: 2 } : {}}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : type === "confirm" ? (
                            <CheckCircleIcon />
                        ) : (
                            <CancelIcon />
                        )}
                        {label && (
                            <Typography variant="button" sx={{ fontWeight: 800 }}>
                                {label}
                            </Typography>
                        )}
                    </Stack>
                </S.ActionButton>
            </Tooltip>
        );
    };

    const ConfirmBtn = ({ booking }: { booking: ApiBookingData }) => (
        <ActionBtn booking={booking} type="confirm" title="Bekräfta bokning" />
    );

    const DeclineBtn = ({ booking }: { booking: ApiBookingData }) => <ActionBtn booking={booking} type="decline" title="Neka bokning" />;

    const CancelBtn = ({ booking, showLabel = false }: { booking: ApiBookingData; showLabel?: boolean }) => (
        <ActionBtn booking={booking} type="cancelled" title="Avboka bokning" label={showLabel ? "Avboka bokning" : undefined} />
    );

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

    return { ConfirmBtn, DeclineBtn, CancelBtn, isUpdating, ConfirmDialog };
};

import { useState } from "react";
import { updateBookingStatus } from "../features/allBookings/services/allBookingsService";
import { useBookingListStore } from "../stores/useBookingListStore";
import { BookingStatus } from "../types/bookingTypes";
import type { ApiBookingData } from "../types/bookingTypes";
import { DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import * as S from "../components/ActionButtons/ActionButtons.styles";
import { TooltipComponent } from "../components/Tooltip/Tooltip";
import { BasicDialog } from "../components/BasicDialog/BasicDialog";

export const useBookingActions = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingBooking, setPendingBooking] = useState<ApiBookingData | null>(null);
    const [dialogMessage, setDialogMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

    const updateBookingStatusInList = useBookingListStore((state) => state.updateBookingStatusInList);

    const executeStatusUpdate = async (id: string, status: BookingStatus, force: boolean = false) => {
        setIsUpdating(true);
        try {
            await updateBookingStatus(id, status, force);
            updateBookingStatusInList(id, status);
        } catch (error: any) {
            const statusErr = error?.response?.status;
            const errorMessage = error?.response?.data?.message;
            console.log("API error response:", error?.response?.data);

            // 409 Conflict med warning = Force-läge
            if (statusErr === 409 && error?.response?.data?.warning) {
                setDialogMessage(errorMessage + "");
                setIsWarning(true);
                setIsError(false); // Detta är en varning, inte ett stopp-fel
                setPendingBooking((prev) => prev); // Behåll ev. pendingBooking
                setDialogOpen(true);
                return;
            }

            // Övriga fel (utan warning) = Stopp
            setDialogMessage(errorMessage || "Ett oväntat fel uppstod.");
            setIsError(true);
            setIsWarning(false);
            setPendingBooking(null);
            setDialogOpen(true);

            console.error(`Kunde inte uppdatera status:`, error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleConfirm = async (booking: ApiBookingData, force: boolean = false) => {
        console.log("HandleConfirm triggad för:", booking.id, "Status:", booking.status);
        const checkInDate = new Date(`${booking.startDate}T15:00:00`);
        const now = new Date();

        // Om datumet har passerat, visa en bekräftelse-ruta
        if (!force && checkInDate < now) {
            setDialogMessage("Varning: Incheckningsdatumet har redan passerat. Vill du fortfarande bekräfta bokningen?");
            setPendingBooking(booking);
            setIsWarning(false);
            setDialogOpen(true);
            return;
        }
        await executeStatusUpdate(booking.id, "confirmed" as BookingStatus, force);
    };

    const handleRestore = async (booking: ApiBookingData, force: boolean = false) => {
        setPendingBooking(booking);
        setIsWarning(false);

        const targetStatus: BookingStatus = booking.status === "declined" ? ("pending" as BookingStatus) : ("confirmed" as BookingStatus);

        const statusText = targetStatus === "pending" ? "väntande" : "bekräftad";

        if (!force) {
            setDialogMessage(
                `Vill du återställa denna ${booking.status === "cancelled" ? "avbokade" : "nekade"} bokning till ${statusText}?`,
            );
            setDialogOpen(true);
            return;
        }

        await executeStatusUpdate(booking.id, targetStatus, force);
    };

    const handleDecline = async (id: string) => executeStatusUpdate(id, "declined" as BookingStatus);
    const handleCancel = async (id: string) => executeStatusUpdate(id, "cancelled" as BookingStatus);

    interface ActionBtnProps {
        booking: ApiBookingData;
        type: "confirm" | "decline" | "cancelled" | "restore";
        title: string;
        label?: string;
    }

    const ActionBtn = ({ booking, type, title, label }: ActionBtnProps) => {
        const isLoading = isUpdating && pendingBooking?.id === booking.id;

        const getIcon = () => {
            if (isLoading) return <CircularProgress size={20} color="inherit" />;
            if (type === "confirm") return <CheckCircleIcon />;
            if (type === "restore") return <RestartAltIcon />; // Ikon för att "backa" status
            return <CancelIcon />;
        };
        return (
            <TooltipComponent title={title}>
                <span style={{ display: "inline-block" }}>
                    <S.ActionButton
                        actionType={type === "confirm" || type === "restore" ? "confirm" : "decline"}
                        disabled={isUpdating}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (type === "confirm") handleConfirm(booking);
                            if (type === "restore") handleRestore(booking);
                            if (type === "decline") handleDecline(String(booking.id));
                            if (type === "cancelled") handleCancel(String(booking.id));
                        }}
                        sx={label ? { width: "auto", px: 2, borderRadius: 2 } : {}}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            {getIcon()}
                            {label && (
                                <Typography variant="button" sx={{ fontWeight: 800 }}>
                                    {label}
                                </Typography>
                            )}
                        </Stack>
                    </S.ActionButton>
                </span>
            </TooltipComponent>
        );
    };

    const ConfirmBtn = ({ booking }: { booking: ApiBookingData }) => (
        <ActionBtn booking={booking} type="confirm" title="Bekräfta bokning" />
    );

    const DeclineBtn = ({ booking }: { booking: ApiBookingData }) => <ActionBtn booking={booking} type="decline" title="Neka bokning" />;

    const CancelBtn = ({ booking, showLabel = false }: { booking: ApiBookingData; showLabel?: boolean }) => (
        <ActionBtn booking={booking} type="cancelled" title="Avboka bokning" label={showLabel ? "Avboka bokning" : undefined} />
    );

    const RestoreBtn = ({ booking, showLabel = false }: { booking: ApiBookingData; showLabel?: boolean }) => (
        <ActionBtn booking={booking} type="restore" title="Återställ bokning" label={showLabel ? "Återställ bokning" : undefined} />
    );

    // Dialog-komponent för bekräftelse och force
    const ConfirmDialog = () => (
        <BasicDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{isError ? "Gick inte att boka" : isWarning ? "Varning" : "Bekräfta ändring"}</DialogTitle>
            <DialogContent>
                <Typography>{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
                {/* Visa bara OK om det är error (stopp-fel) eller warning (force-läge) */}
                {isError || isWarning ? (
                    <Button onClick={() => setDialogOpen(false)} color="primary" variant="contained">
                        OK
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => setDialogOpen(false)} color="inherit">
                            Avbryt
                        </Button>
                        <Button
                            onClick={async () => {
                                setDialogOpen(false);
                                if (pendingBooking) {
                                    if (pendingBooking.status === "cancelled" || pendingBooking.status === "declined") {
                                        await handleRestore(pendingBooking, true);
                                    } else {
                                        await handleConfirm(pendingBooking, true);
                                    }
                                }
                            }}
                            color="primary"
                            variant="contained"
                            autoFocus
                            disabled={isUpdating}
                        >
                            Verkställ
                        </Button>
                    </>
                )}
            </DialogActions>
        </BasicDialog>
    );

    return { ConfirmBtn, DeclineBtn, CancelBtn, RestoreBtn, isUpdating, ConfirmDialog };
};

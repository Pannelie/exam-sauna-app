import { Stack, Tooltip } from "@mui/material";
import type { ApiBookingData } from "../../types/bookingTypes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as S from "./ActionButtons.styles";
import { useBookingActions } from "../../hooks/useActionButtons";

interface ActionButtonsProps {
    booking: ApiBookingData;
    onStatusChange?: () => void; // <--- Ny prop
}

export const ActionButtons = ({ booking, onStatusChange }: ActionButtonsProps) => {
    const { handleConfirm, handleDecline, isUpdating, ConfirmDialog } = useBookingActions(onStatusChange);
    return (
        <>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Bekräfta bokning" arrow>
                    <S.ActionButton
                        actionType="confirm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(booking);
                        }}
                        disabled={isUpdating}
                    >
                        <CheckCircleIcon />
                    </S.ActionButton>
                </Tooltip>

                <Tooltip title="Neka bokning" arrow>
                    <S.ActionButton
                        actionType="decline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDecline(String(booking.id));
                        }}
                        disabled={isUpdating}
                    >
                        <CancelIcon />
                    </S.ActionButton>
                </Tooltip>
            </Stack>
            <ConfirmDialog />
        </>
    );
};

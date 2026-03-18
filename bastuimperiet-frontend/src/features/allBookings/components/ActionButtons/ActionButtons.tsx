import { Stack, Tooltip } from "@mui/material";
import type { ApiBookingData } from "../../../../types/bookingTypes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as S from "../BookingCard/BookingCard.styles";

export const ActionButtons = ({
    booking,
    onConfirm,
    onDecline,
}: {
    booking: ApiBookingData;
    onConfirm?: (id: string) => void;
    onDecline?: (id: string) => void;
}) => (
    <Stack direction="row" spacing={1}>
        <Tooltip title="Bekräfta bokning" arrow>
            <S.ActionButton
                actionType="confirm"
                onClick={(e) => {
                    e.stopPropagation();
                    onConfirm?.(String(booking.id));
                }}
            >
                <CheckCircleIcon />
            </S.ActionButton>
        </Tooltip>

        <Tooltip title="Neka bokning" arrow>
            <S.ActionButton
                actionType="decline"
                onClick={(e) => {
                    e.stopPropagation();
                    onDecline?.(String(booking.id));
                }}
            >
                <CancelIcon />
            </S.ActionButton>
        </Tooltip>
    </Stack>
);

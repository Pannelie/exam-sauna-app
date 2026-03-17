import { Stack, Typography, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ApiBookingData } from "../../../../../types/bookingTypes";
import { useNavigate, useParams } from "react-router-dom";
import { getStatusColor, getStatusText } from "../../../utils/bookingHelpers";
import * as S from "./BookingCard.styles";

interface BookingCardProps {
    booking: ApiBookingData;
    onHover?: (id: string | null) => void;
    onConfirm?: (id: string) => void;
    onDecline?: (id: string) => void;
}

export const BookingCard = ({ booking, onHover, onConfirm, onDecline }: BookingCardProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isActive = id === String(booking.id);
    const statusColor = getStatusColor({ booking });

    return (
        <S.StyledPaper
            elevation={0}
            isActive={isActive}
            statusColor={statusColor}
            onClick={() => navigate(`/admin/bookings/${booking.id}`)}
            onMouseEnter={() => onHover?.(String(booking.id))}
            onMouseLeave={() => onHover?.(null)}
        >
            {/* TOPP: Den lilla status-indikatorn */}
            <S.TopIndicator statusColor={statusColor} />

            {/* MITTEN: ID och Datum (centrerat vertikalt genom flex-grow) */}
            <S.ContentBox>
                {" "}
                <Typography variant="h6" sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "1.1rem" }}>
                    #{booking.id}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.85rem" }}>
                    {new Date(booking.startDate).toLocaleDateString("sv-SE")}
                    {" — "}
                    {new Date(booking.endDate).toLocaleDateString("sv-SE")}
                </Typography>
            </S.ContentBox>

            {/* BOTTEN: Knappar ELLER Status-etikett */}
            <S.ActionWrapper>
                {booking.status === "pending" ? (
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
                ) : (
                    <S.StatusLabel variant="caption" statusColor={statusColor}>
                        {getStatusText({ booking })}
                    </S.StatusLabel>
                )}
            </S.ActionWrapper>
        </S.StyledPaper>
    );
};

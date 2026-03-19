import { Typography } from "@mui/material";
import type { ApiBookingData } from "../../../../types/bookingTypes";
import { useNavigate, useParams } from "react-router-dom";
import { getStatusColor, getStatusText } from "../../utils/bookingHelpers";
import * as S from "./BookingCard.styles";
import { ActionButtons } from "../../../../components/ActionButtons/ActionButtons";

interface BookingCardProps {
    booking: ApiBookingData;
    onHover?: (id: string | null) => void;
    onStatusChange?: () => void;
}

export const BookingCard = ({ booking, onHover, onStatusChange }: BookingCardProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isActive = id === String(booking.id);
    const statusColor = getStatusColor({ booking });

    const handleCardClick = () => {
        navigate(`/admin/bookings/${booking.id}`);
    };

    return (
        <S.StyledPaper
            elevation={0}
            isActive={isActive}
            statusColor={statusColor}
            onClick={handleCardClick}
            onMouseEnter={() => onHover?.(String(booking.id))}
            onMouseLeave={() => onHover?.(null)}
        >
            {/* MITTEN: ID och Datum (centrerat vertikalt genom flex-grow) */}
            <S.ContentBox>
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
                    <ActionButtons booking={booking} onStatusChange={onStatusChange} />
                ) : (
                    <S.StatusLabel variant="caption" statusColor={statusColor}>
                        {getStatusText({ booking })}
                    </S.StatusLabel>
                )}
            </S.ActionWrapper>
        </S.StyledPaper>
    );
};

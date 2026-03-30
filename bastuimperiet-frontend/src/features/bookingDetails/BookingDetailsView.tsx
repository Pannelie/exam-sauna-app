import { useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { BookingStatus } from "../../types/bookingTypes";
import { Today, FmdGood } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { getStatusChip, StatusIndicator, formatDateTime } from "./utils/bookingDetailHelpers";
import { getBookingChips } from "./components/BookingChips/BookingChips";
import { useBookingActions } from "../../hooks/useActionButtons";
import { useBookingListStore } from "../../stores/useBookingListStore";
import { useEffect } from "react";
import * as S from "./bookingDetailsView.style";

export const BookingDetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedBooking, fetchBookingById } = useBookingListStore();

    useEffect(() => {
        // Om jag har ett ID i URL:en men ingen bokning laddad i storen
        if (id && (!selectedBooking || String(selectedBooking.id) !== id)) {
            fetchBookingById(id);
        }
    }, [id, selectedBooking, fetchBookingById]);

    const { ConfirmBtn, DeclineBtn, CancelBtn, RestoreBtn, ConfirmDialog } = useBookingActions();
    const booking = selectedBooking;

    if (!booking) {
        return <Typography>Laddar bokning...</Typography>;
    }
    const statusChip = getStatusChip(booking.status);
    const bookingChips = getBookingChips(booking);

    const firstName = booking.name.split(" ")[0];
    const lastName = booking.name.split(" ")[1] || "";

    return (
        <>
            {/*----------------------------Header: ID, Pris och Status--------------------------------------*/}
            <S.HeaderContainer>
                <Box>
                    <S.CustomerIdLabel variant="caption">KUND #{booking.id}</S.CustomerIdLabel>
                    <S.DynamicName textLength={firstName.length}>{firstName}</S.DynamicName>
                    <S.DynamicName textLength={lastName.length} isLastName>
                        {lastName}
                    </S.DynamicName>
                </Box>
                <Stack spacing={1} alignItems="flex-end">
                    <Typography variant="h5" color="primary.main" fontWeight="bold">
                        {booking.totalPrice} kr
                    </Typography>
                    {statusChip}
                </Stack>
            </S.HeaderContainer>

            <Divider />

            {/* -------------------------------------Datum & Kontakt--------------------------------------*/}

            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Today fontSize="small" color="disabled" />
                <Typography variant="body2" fontSize={16} fontWeight="600">
                    {formatDateTime(booking.startDate)} — {formatDateTime(booking.endDate)}
                </Typography>
            </Stack>

            <Divider />

            <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <LocalPhoneIcon fontSize="small" color="disabled" />
                    <S.ContactValue variant="body2">{booking.phone}</S.ContactValue>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <EmailIcon fontSize="small" color="disabled" />
                    <S.ContactValue variant="body2">{booking.email}</S.ContactValue>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <FmdGood fontSize="small" color="disabled" />
                    <S.ContactValue variant="body2">
                        {booking.address}, {booking.postalCode} {booking.city}
                    </S.ContactValue>
                </Stack>
            </Box>

            {/* -------------------------------------Tillval -------------------------------------- */}
            <S.ChipsContainer>
                {bookingChips.length > 0 ? (
                    bookingChips
                ) : (
                    <Typography variant="body2" color="text.disabled" textAlign={"center"}>
                        Inga tillval
                    </Typography>
                )}
            </S.ChipsContainer>

            {/* Integrationsstatus - visas endast om bokningen inte är väntande */}
            {booking.status !== BookingStatus.Pending && (
                <>
                    <Divider />
                    <S.IntegrationPaper variant="outlined">
                        <Stack direction="row" spacing={3}>
                            <StatusIndicator label="Kalender synkad" active={booking.integrations?.calendarUpdated} />
                            <StatusIndicator label="Gäst-email skickat" active={booking.integrations?.guestEmailSent} />
                        </Stack>

                        {/* Visa felmeddelanden om de finns */}
                        {(booking.integrations?.calendarError || booking.integrations?.guestEmailError) && (
                            <S.IntegrationError variant="caption" color="error">
                                Obs! Ett eller flera fel uppstod vid synkronisering.
                            </S.IntegrationError>
                        )}
                    </S.IntegrationPaper>
                </>
            )}

            <S.ActionFooter direction="row" spacing={1}>
                {booking.status === BookingStatus.Pending && (
                    <>
                        <ConfirmBtn booking={booking} />
                        <DeclineBtn booking={booking} />
                    </>
                )}
                {booking.status === BookingStatus.Confirmed && <CancelBtn booking={booking} />}
                {(booking.status === BookingStatus.Cancelled || booking.status === BookingStatus.Declined) && (
                    <RestoreBtn booking={booking} showLabel={true} />
                )}
            </S.ActionFooter>
            {/* ConfirmDialog alltid renderad */}
            <ConfirmDialog />
        </>
    );
};

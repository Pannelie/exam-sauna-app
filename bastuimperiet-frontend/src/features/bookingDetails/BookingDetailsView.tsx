import { useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider, Paper } from "@mui/material";
import { BookingStatus } from "../../types/bookingTypes";
import { Today, FmdGood } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { getStatusChip, StatusIndicator, formatDateTime } from "./utils/bookingDetailHelpers";
import { getBookingChips } from "./components/BookingChips/BookingChips";
import { useBookingActions } from "../../hooks/useActionButtons";
import { useBookingListStore } from "../../stores/useBookingListStore";
import { useEffect } from "react";
import theme from "../../theme";

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

    const getDynamicFontSize = (text: string) => {
        if (text.length > 15) return "1.1rem";
        if (text.length > 10) return "1.3rem";
        return "1.5rem";
    };

    return (
        <>
            {/*----------------------------Header: ID, Pris och Status--------------------------------------*/}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                        KUND #{booking.id}
                    </Typography>
                    <Typography
                        fontWeight="bold"
                        sx={{
                            fontSize: getDynamicFontSize(firstName),
                            lineHeight: 1.1,
                            wordBreak: "break-all",
                        }}
                    >
                        {firstName}
                    </Typography>

                    <Typography
                        fontWeight="bold"
                        sx={{
                            fontSize: getDynamicFontSize(lastName),
                            lineHeight: 1.1,
                            color: "text.primary",
                            opacity: 0.9,
                        }}
                    >
                        {lastName}
                    </Typography>
                </Box>
                <Stack spacing={1} alignItems="flex-end">
                    <Typography variant="h5" color="primary.main" fontWeight="bold">
                        {booking.totalPrice} kr
                    </Typography>
                    {statusChip}
                </Stack>
            </Box>

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
                    <Typography variant="body2" fontWeight="500" color={theme.palette.text.primary}>
                        {booking.phone}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <EmailIcon fontSize="small" color="disabled" />
                    <Typography variant="body2" fontWeight="500" color={theme.palette.text.primary}>
                        {booking.email}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <FmdGood fontSize="small" color="disabled" />
                    <Typography variant="body2" fontWeight="500" color={theme.palette.text.primary}>
                        {booking.address}, {booking.postalCode} {booking.city}
                    </Typography>
                </Stack>
            </Box>

            {/* -------------------------------------Tillval -------------------------------------- */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                }}
            >
                {bookingChips.length > 0 ? (
                    bookingChips
                ) : (
                    <Typography variant="body2" color="text.disabled" textAlign={"center"}>
                        Inga tillval
                    </Typography>
                )}
            </Box>

            {/* Integrationsstatus - visas endast om bokningen inte är väntande */}
            {booking.status !== BookingStatus.Pending && (
                <>
                    <Divider />
                    <Paper variant="outlined" sx={{ p: 1.5, bgcolor: "background.default", borderRadius: 1 }}>
                        <Stack direction="row" spacing={3}>
                            <StatusIndicator label="Kalender synkad" active={booking.integrations?.calendarUpdated} />
                            <StatusIndicator label="Gäst-email skickat" active={booking.integrations?.guestEmailSent} />
                        </Stack>

                        {/* Visa felmeddelanden om de finns */}
                        {(booking.integrations?.calendarError || booking.integrations?.guestEmailError) && (
                            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                                Obs! Ett eller flera fel uppstod vid synkronisering.
                            </Typography>
                        )}
                    </Paper>
                </>
            )}

            <Stack direction="row" justifyContent="center" spacing={1} marginTop={"auto"}>
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
            </Stack>
            {/* ConfirmDialog alltid renderad */}
            <ConfirmDialog />
        </>
    );
};

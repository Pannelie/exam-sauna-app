import { useOutletContext, useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider, Paper } from "@mui/material";
import { BookingStatus, type ApiBookingData } from "../../types/bookingTypes";
import { Today, Person, FmdGood } from "@mui/icons-material";
import { getStatusChip, StatusIndicator, formatDateTime } from "./utils/bookingDetailHelpers";
import { getBookingChips } from "./components/BookingChips/BookingChips";
import { useBookingActions } from "../../hooks/useActionButtons";

export const BookingDetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const { bookings, refreshData, refreshCalendar } = useOutletContext<{
        bookings: ApiBookingData[];
        refreshData: () => Promise<void>;
        refreshCalendar: () => Promise<void>;
    }>();

    const handleSuccess = async () => {
        try {
            await refreshData();

            setTimeout(async () => {
                await refreshCalendar();
                console.log("Kalender synkad");
            }, 800);
        } catch (error) {
            console.error("Misslyckades att uppdatera vyerna:", error);
        }
    };

    const { ConfirmBtn, DeclineBtn, CancelBtn, RestoreBtn, ConfirmDialog } = useBookingActions(handleSuccess);

    const booking = bookings.find((b) => b.id === id);

    if (!booking) {
        return <Typography>Laddar bokning...</Typography>;
    }
    const statusChip = getStatusChip(booking.status);
    const bookingChips = getBookingChips(booking);

    return (
        <Box sx={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            {/*----------------------------Header: ID, Pris och Status--------------------------------------*/}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                        BOKNINGS-ID
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {booking.id}
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
                    <Person fontSize="small" color="disabled" />
                    <Typography variant="body2" fontSize={16} fontWeight="600">
                        {booking.name}
                    </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                    {booking.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {booking.phone}
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <FmdGood fontSize="small" color="disabled" />
                    <Typography variant="body2" fontSize={16} fontWeight="600">
                        Adress
                    </Typography>
                </Stack>
                <Typography variant="body2" fontWeight="500">
                    {booking.address}, {booking.postalCode} {booking.city}
                </Typography>
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
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
                        <Typography variant="body2" gutterBottom textAlign={"left"}>
                            Systemstatus
                        </Typography>
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
                {booking.status === BookingStatus.Confirmed && (
                    <>
                        <CancelBtn booking={booking} />
                        <ConfirmDialog />
                    </>
                )}
                {(booking.status === BookingStatus.Cancelled || booking.status === BookingStatus.Declined) && (
                    <>
                        <RestoreBtn booking={booking} showLabel={true} />
                        <ConfirmDialog />
                    </>
                )}
            </Stack>
        </Box>
    );
};

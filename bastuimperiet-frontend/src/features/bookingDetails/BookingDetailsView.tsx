import { useOutletContext, useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider, Paper } from "@mui/material";
import { BookingStatus, type ApiBookingData } from "../../types/bookingTypes";
import { Today, Person, FmdGood } from "@mui/icons-material";
import { getStatusChip, StatusIndicator } from "./utils/bookingDetailHelpers";
import { getBookingChips } from "./components/BookingChips/BookingChips";
import { ActionButtons } from "../../components/ActionButtons/ActionButtons";

export const BookingDetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const { bookings, refreshData } = useOutletContext<{ bookings: ApiBookingData[]; refreshData: () => void }>();

    const booking = bookings.find((b) => b.id === id);

    if (!booking) {
        return <Typography>Laddar bokning...</Typography>;
    }
    const statusChip = getStatusChip(booking.status);
    const bookingChips = getBookingChips(booking);

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
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

            {/* <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 4, // Mer utrymme mellan kolumnerna
                }}
            > */}
            {/* -------------------------------------Datum & Kontakt--------------------------------------*/}

            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Today fontSize="small" color="disabled" />
                <Typography variant="body2" fontSize={16} fontWeight="600">
                    {booking.startDate} — {booking.endDate}
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
                    {booking.address}
                </Typography>
                <Typography variant="body2" fontWeight="500">
                    {booking.postalCode} {booking.city}
                </Typography>
            </Box>

            {/* -------------------------------------HÖGER: Tillval -------------------------------------- */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
                {bookingChips.length > 0 ? (
                    bookingChips
                ) : (
                    <Typography variant="body2" color="text.disabled" textAlign={"center"}>
                        Inga tillval
                    </Typography>
                )}
            </Box>

            {booking.status === BookingStatus.Pending && <ActionButtons booking={booking} onStatusChange={refreshData} />}
            {/* Sektion 3: Integrationsstatus - visas endast om bokningen inte är väntande */}
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
        </Box>
    );
};

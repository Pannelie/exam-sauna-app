import { Box, Typography, Paper, Divider, Stack } from "@mui/material";
import { Today, Person, FmdGood } from "@mui/icons-material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SpaIcon from "@mui/icons-material/Spa";
import type { ApiBookingData } from "../../../types/bookingTypes";
import { BookingStatus } from "../../../types/bookingTypes";
import { TransportType } from "../../../types/bookingTypes";
import { InfoTile, getStatusChip, StatusIndicator } from "../utils/bookingDetailHelpers";

export const ViewFullSummary = ({ booking }: { booking: ApiBookingData }) => {
    const statusChip = getStatusChip(booking.status);
    console.log(booking);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Header: ID, Pris och Status */}
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

            {/* Sektion 1: Datum och Kontaktuppgifter (Ersätter Grid med Flexbox) */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                }}
            >
                {/* DATUM */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">
                        Datum
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Today color="action" />
                        <Typography variant="body1">
                            {booking.startDate} — {booking.endDate}
                        </Typography>
                    </Stack>
                </Box>

                {/* KONTAKT */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">
                        Kontaktuppgifter
                    </Typography>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Person color="action" fontSize="small" />
                            <Typography variant="body1">
                                <strong>{booking.name}</strong>
                            </Typography>
                        </Stack>
                        <Typography variant="body2">{booking.email}</Typography>
                        <Typography variant="body2">{booking.phone}</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* ADRESS */}
            <Box>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Adress
                </Typography>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <FmdGood color="action" />
                    <Typography variant="body2">
                        {booking.address},<br />
                        {booking.postalCode} {booking.city}
                    </Typography>
                </Stack>
            </Box>

            <Divider />

            {/* Sektion 2: Tjänster & Tillval */}
            <Box>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Tjänster & Tillval
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    {booking.firewood > 0 && (
                        <InfoTile
                            icon={<LocalFireDepartmentIcon color="error" />}
                            label="Ved"
                            value={`${booking.firewood} ${booking.firewood === 1 ? "säck" : "säckar"}`}
                        />
                    )}

                    {booking.scent > 0 && <InfoTile icon={<SpaIcon color="primary" />} label="Doft" value={`${booking.scent} st`} />}

                    {booking.cleaning && <InfoTile icon={<CleaningServicesIcon color="success" />} label="Städning" value="Inkluderat" />}

                    {booking.delivery && (
                        <InfoTile
                            icon={<LocalShippingIcon color="info" />}
                            label="Transport"
                            value={booking.transportType === TransportType.Return ? "Tur & Retur" : "Enkel"}
                        />
                    )}
                </Box>
            </Box>

            <Divider />

            {/* Sektion 3: Integrationsstatus - visas endast om bokningen inte är väntande */}
            {booking.status !== BookingStatus.Pending && (
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
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
            )}
        </Box>
    );
};

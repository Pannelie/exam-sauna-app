import { useOutletContext, useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import type { ApiBookingData } from "../../types/bookingTypes";
import { ViewFullSummary } from "./ViewFullSummary/ViewFullSummary";

export const BookingDetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const { bookings } = useOutletContext<{ bookings: ApiBookingData[] }>();

    const selectedBooking = bookings.find((b) => b.id === id);

    if (!selectedBooking) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">Välj en bokning i listan för att se detaljer.</Typography>
            </Box>
        );
    }

    // Om din BookingSummary förväntar sig BookingFormData men ApiBookingData skiljer sig,
    // kan du behöva mappa om 'selectedBooking' här.
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">Boknings-ID: {selectedBooking.id}</Typography>
            <ViewFullSummary booking={selectedBooking} />
        </Box>
    );
};

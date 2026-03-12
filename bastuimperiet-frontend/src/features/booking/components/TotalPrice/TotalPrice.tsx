import { Stack, Typography, Paper } from "@mui/material";
import type { BookingFormData } from "../../types/bookingTypes";

interface TotalPriceProps {
    data: BookingFormData;
}

export const TotalPrice = ({ data }: TotalPriceProps) => {
    // Priser per sak
    const priceVed = 50;
    const priceDoft = 30;
    const priceCleaning = 500;
    const priceDelivery = 200;

    // Räkna antal dagar
    const start = data.startDate ? new Date(data.startDate) : null;
    const end = data.endDate ? new Date(data.endDate) : null;
    const days = start && end ? Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))) : 0;

    // Grundpris per dygn (här kan du hämta från ditt priser-array om du vill)
    const basePricePerDay = 600; // exempel: vardagspris
    const baseTotal = days * basePricePerDay;

    // Extra-priser
    const extrasTotal =
        (data.ved || 0) * priceVed +
        (data.doft || 0) * priceDoft +
        (data.cleaning ? priceCleaning : 0) +
        (data.delivery ? priceDelivery : 0);

    const total = baseTotal + extrasTotal;

    return (
        <Paper sx={{ p: 2, mt: "auto" }}>
            <Stack direction="row" justifyContent="space-between">
                <Typography>Totalt</Typography>
                <Typography>{total} kr</Typography>
            </Stack>
            {days > 0 && (
                <Typography variant="body2">
                    {days} dygn à {basePricePerDay} kr
                </Typography>
            )}
        </Paper>
    );
};

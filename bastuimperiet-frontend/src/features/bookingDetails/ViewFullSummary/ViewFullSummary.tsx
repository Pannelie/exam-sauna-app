import { Box, Typography, Divider, Stack } from "@mui/material";
import { LocalFireDepartment, AutoAwesome, DryCleaning, LocalShipping } from "@mui/icons-material";
import type { ApiBookingData } from "../../../types/bookingTypes";
import { getStatusChip, InfoTile } from "./utils/bookingDetailHelpers";
import { TransportType } from "../../../types/bookingTypes";

export const ViewFullSummary = ({ booking }: { booking: ApiBookingData }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* ... Status och Header ... */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Bokning {booking.id}</Typography>
                {getStatusChip(booking.status)}
            </Box>

            <Divider />

            {/* Tjänster & Tillval med Ikoner */}
            <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Tillval & Tjänster
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    {/* VED */}
                    <InfoTile icon={<LocalFireDepartment color="error" />} label="Ved" value={`${booking.firewood} säckar`} />

                    {/* DOFT */}
                    <InfoTile icon={<AutoAwesome color="primary" />} label="Doft" value={`${booking.scent} ml`} />

                    {/* STÄDNING */}
                    {booking.cleaning && <InfoTile icon={<DryCleaning color="success" />} label="Städning" value="Inkluderat" />}

                    {/* LEVERANS */}
                    {booking.delivery && (
                        <InfoTile
                            icon={<LocalShipping color="info" />}
                            label="Utkörning"
                            value={booking.transportType === TransportType.Return ? "Tur & Retur" : "Enkel"}
                        />
                    )}
                </Stack>
            </Box>

            {/* ... Kontaktuppgifter etc ... */}
        </Box>
    );
};

import { Box, Chip } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SpaIcon from "@mui/icons-material/Spa";
import { TransportType } from "../../../../types/bookingTypes";
import type { ApiBookingData } from "../../../../types/bookingTypes";

export const getBookingChips = (booking: ApiBookingData) => {
    const chips = [];

    if (booking.firewood > 0) {
        chips.push({
            id: "firewood",
            // Vi skickar in ett objekt med båda texterna
            fullLabel: `${booking.firewood} ${booking.firewood === 1 ? "säck" : "säckar"} ved`,
            shortLabel: `${booking.firewood}`,
            icon: <LocalFireDepartmentIcon sx={{ fontSize: "18px !important", color: "#d32f2f" }} />,
            color: "rgba(211, 47, 47, 0.08)",
        });
    }

    if (booking.scent > 0) {
        chips.push({
            id: "scent",
            fullLabel: `${booking.scent} ${booking.scent === 1 ? "st doft" : "st dofter"}`,
            shortLabel: `${booking.scent}`,
            icon: <SpaIcon sx={{ fontSize: "18px !important", color: "#1976d2" }} />,
            color: "rgba(25, 118, 210, 0.08)",
        });
    }

    if (booking.cleaning) {
        chips.push({
            id: "cleaning",
            fullLabel: "Städning",
            shortLabel: "", // Bara ikonen på mobil
            icon: <CleaningServicesIcon sx={{ fontSize: "18px !important", color: "#2e7d32" }} />,
            color: "rgba(46, 125, 50, 0.08)",
        });
    }

    if (booking.delivery) {
        chips.push({
            id: "delivery",
            fullLabel: booking.transportType === TransportType.OneWay ? "Utkörning" : "Utkörning T&R",
            shortLabel: booking.transportType === TransportType.OneWay ? "1" : "T&R",
            icon: <LocalShippingIcon sx={{ fontSize: "18px !important", color: "#0288d1" }} />,
            color: "rgba(2, 136, 209, 0.08)",
        });
    }

    return chips.map((c) => (
        <Chip
            key={c.id}
            icon={c.icon}
            // MEDIA QUERY I LABEL:
            label={
                <>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                        {c.fullLabel}
                    </Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                        {c.shortLabel}
                    </Box>
                </>
            }
            size="small"
            sx={{
                bgcolor: c.color,
                border: "1px solid transparent",
                fontWeight: 600,
                borderRadius: "6px",
                height: "28px",
                // MEDIA QUERY FÖR MIN-WIDTH:
                // Om texten döljs helt (städning) vill vi att chippet blir smalt/fyrkantigt
                minWidth: { xs: c.shortLabel === "" ? "32px" : "auto", sm: "auto" },
                "& .MuiChip-label": {
                    px: 1,
                    // Dölj padding på etiketten om det inte finns någon text (för städning på mobil)
                    display: { xs: c.shortLabel === "" ? "none" : "block", sm: "block" },
                },
                "& .MuiChip-icon": {
                    ml: 0.5,
                    // Centrera ikonen om texten är borta
                    mr: { xs: c.shortLabel === "" ? 0.5 : 0, sm: 0 },
                },
            }}
        />
    ));
};

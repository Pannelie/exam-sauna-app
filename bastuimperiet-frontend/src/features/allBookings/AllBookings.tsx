import { useState, useEffect } from "react";
import { getAllBookings } from "./services/allBookingsService";
import type { ApiBookingData } from "../../types/bookingTypes";
import { BookingCard } from "./services/components/BookingCard/BookingCard";
import { Box, Typography, Paper, Tabs, Tab, styled } from "@mui/material";
import { BookingLayout } from "./services/components/BookingLayout/BookingLayout";
import { Outlet } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1.5rem",
    padding: theme.spacing(1),
}));

const ListContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "0 20px 20px 20px",
    padding: theme.spacing(2),
    overflowY: "auto",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
}));

export default function AllBookings() {
    const [bookings, setBookings] = useState<ApiBookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [hoveredBookingId, setHoveredBookingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data);
            } catch (error) {
                console.error("Misslyckades att hämta bokningar:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleConfirmBooking = async (id: string) => {
        console.log("Anropar API för att bekräfta:", id);
        // Här gör du din fetch/axios: patch(`/api/bookings/${id}`, { status: 'confirmed' })
    };

    const handleDeclineBooking = async (id: string) => {
        console.log("Anropar API för att neka:", id);
    };

    const filteredBookings = bookings.filter((b) => {
        if (tabIndex === 1) return b.status === "pending";
        if (tabIndex === 2) return b.status === "confirmed";
        if (tabIndex === 3) return b.status === "declined";
        if (tabIndex === 4) return b.status === "cancelled";
        return true;
    });

    if (loading) return <div>Laddar bokningar...</div>;

    return (
        <BookingLayout
            sidebar={
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* FLIKARNA (TABS) */}
                    <Tabs
                        value={tabIndex}
                        onChange={(_, v) => setTabIndex(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            "& .MuiTabs-indicator": { display: "none" },
                            "& .MuiTab-root": {
                                color: "rgba(255,255,255,0.7)",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(5px)",
                                borderRadius: "12px 12px 0 0", // Runda bara toppen
                                marginRight: "5px",
                                transition: "all 0.2s",
                                "&.Mui-selected": {
                                    color: "#333",
                                    // Samma färg som ListContent för att "smälta ihop"
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                },
                            },
                        }}
                    >
                        <Tab label="Alla" />
                        <Tab label="Väntar" />
                        <Tab label="Bekräftade" />
                        <Tab label="Avböjda" />
                        <Tab label="Avbokade" />
                    </Tabs>

                    <ListContent>
                        <StyledBox>
                            {filteredBookings.map((b) => (
                                <BookingCard
                                    key={b.id}
                                    booking={b}
                                    onHover={setHoveredBookingId}
                                    onConfirm={handleConfirmBooking}
                                    onDecline={handleDeclineBooking}
                                />
                            ))}
                        </StyledBox>
                        {filteredBookings.length === 0 && (
                            <Typography sx={{ p: 4, textAlign: "center", color: "gray" }}>Inga bokningar i denna kategori</Typography>
                        )}
                    </ListContent>
                </Box>
            }
            // Höger sida: Kalender och Outlet för detaljer
            mainContent={
                <>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Kalendervy
                        </Typography>
                        {/* Här skickar du sen in din kalenderkomponent */}
                        <Box sx={{ height: "300px", bgcolor: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            [Kalender - Hovrat ID: {hoveredBookingId || "Ingen"}]
                        </Box>
                    </Paper>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Bokningsdetaljer
                        </Typography>
                        <Paper sx={{ p: 2, minHeight: "200px" }}>
                            {/* Skickar med bokningarna som context så detaljvyn kan hitta rätt person */}
                            <Outlet context={{ bookings }} />
                        </Paper>
                    </Box>
                </>
            }
        />
    );
}

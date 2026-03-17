import { useState, useEffect, useMemo } from "react";
import { getAllBookings } from "./services/allBookingsService";
import { BookingCard } from "./services/components/BookingCard/BookingCard";
import { BookingCardSkeleton } from "../allBookings/services/components/BookingCardSkeleton/BookingCardSkeleton";
import { Box, Typography, Tabs } from "@mui/material";
import { BookingLayout } from "./services/components/BookingLayout/BookingLayout";
import { Outlet } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { filterBookingsByTab } from "./utils/bookingHelpers";
import type { ApiBookingData } from "../../types/bookingTypes";

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

    const filteredBookings = useMemo(() => filterBookingsByTab(bookings, tabIndex), [bookings, tabIndex]);

    return (
        <BookingLayout
            sidebar={
                <S.SidebarWrapper>
                    <Tabs
                        value={tabIndex}
                        onChange={(_, v) => setTabIndex(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ "& .MuiTabs-indicator": { display: "none" } }}
                    >
                        <S.StyledTab label="Alla" />
                        <S.StyledTab label="Väntar" />
                        <S.StyledTab label="Bekräftade" />
                        <S.StyledTab label="Avböjda" />
                        <S.StyledTab label="Avbokade" />
                    </Tabs>
                    <S.ListContent>
                        <S.StyledBox>
                            {loading
                                ? Array.from(new Array(8)).map((_, i) => <BookingCardSkeleton key={i} />)
                                : filteredBookings.map((b) => (
                                      <BookingCard
                                          key={b.id}
                                          booking={b}
                                          onHover={setHoveredBookingId}
                                          onConfirm={handleConfirmBooking}
                                          onDecline={handleDeclineBooking}
                                      />
                                  ))}
                        </S.StyledBox>
                        {!loading && filteredBookings.length === 0 && (
                            <Typography sx={{ p: 4, textAlign: "center", color: "gray" }}>Inga bokningar i denna kategori</Typography>
                        )}
                    </S.ListContent>
                </S.SidebarWrapper>
            }
            // Höger sida: Kalender och Outlet för detaljer
            mainContent={
                <>
                    <S.CalendarPaper>
                        <Typography variant="h6" gutterBottom>
                            Kalendervy
                        </Typography>
                        <S.CalendarPlaceholder>[Kalender - Hovrat ID: {hoveredBookingId || "Ingen"}]</S.CalendarPlaceholder>
                    </S.CalendarPaper>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Bokningsdetaljer
                        </Typography>
                        <S.DetailsPaper>
                            <Outlet context={{ bookings }} />
                        </S.DetailsPaper>
                    </Box>
                </>
            }
        />
    );
}

import { useState, useEffect } from "react";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { BookingCardSkeleton } from "./components/BookingCardSkeleton/BookingCardSkeleton";
import { Typography, Drawer, useMediaQuery, useTheme, Box } from "@mui/material";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { useBookings } from "./hooks/useBookings";
import { ViewSwitcher } from "./components/ViewSwitcher/ViewSwitcher";
import { GoogleCalendar } from "../calendar/GoogleCalendar";
import { useCalendar } from "../calendar/hooks/useCalendar";
import { BookingFilters } from "./components/BookingFilters/BookingFilters";

export default function AllBookings() {
    const { bookings, loading, tabIndex, setTabIndex, searchTerm, setSearchTerm, filteredBookings, refreshData, setSelectedBooking } =
        useBookings();
    const { events, loading: calLoading, clickedId, setClickedId, hoveredBookingId, setHoveredBookingId } = useCalendar();
    const [mobileTab, setMobileTab] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const categories = ["Nya", "Bekräftade", "Nekade", "Avbokade", "Alla"];

    useEffect(() => {
        setClickedId(id || null);
    }, [id, setClickedId]);

    const handleGlobalUpdate = async () => {
        // statusMap[tabIndex] ser till att vi håller oss till rätt flik
        const currentStatus = ["pending", "confirmed", "declined", "cancelled", null][tabIndex];
        await refreshData(currentStatus, true);
    };

    // Funktion för att kolla om en bokning är "ny" (t.ex. skapad senaste 10 minuterna)
    const isRecent = (createdAt: string) => {
        const diff = Date.now() - new Date(createdAt).getTime();
        return diff < 600000; // 10 minuter
    };

    return (
        <>
            {isMobile && (
                <Box sx={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                    <ViewSwitcher value={mobileTab} onChange={setMobileTab} />
                </Box>
            )}

            <S.MainContainer $isMobile={isMobile}>
                {/* VÄNSTER: LISTA */}
                {(!isMobile || mobileTab === 0) && (
                    <S.ListWrapper $isMobile={isMobile}>
                        {/* HÄR ÄR DEN NYA KOMPONENTEN */}
                        <BookingFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                            categories={categories}
                            isMobile={isMobile}
                        />

                        <S.ScrollableList>
                            {loading
                                ? Array.from(new Array(5)).map((_, i) => <BookingCardSkeleton key={i} />)
                                : filteredBookings.map((b) => (
                                      <BookingCard
                                          key={b.id}
                                          booking={b}
                                          onStatusChange={handleGlobalUpdate}
                                          onMouseEnter={() => setHoveredBookingId(b.id)}
                                          onMouseLeave={() => setHoveredBookingId(null)}
                                          $isNew={isRecent(b.createdAt)} // Din logik för 10 minuter
                                          onClick={() => setSelectedBooking(b)} // Spara i storen!
                                      />
                                  ))}
                        </S.ScrollableList>
                    </S.ListWrapper>
                )}

                {/* DESKTOP VYER */}
                {!isMobile && (
                    <>
                        <S.ContentPaper sx={{ flex: 1 }}>
                            <GoogleCalendar
                                events={events}
                                loading={calLoading}
                                clickedId={clickedId}
                                hoveredBookingId={hoveredBookingId}
                            />
                        </S.ContentPaper>

                        <S.ContentPaper sx={{ flex: 1, maxWidth: "400px" }}>
                            <S.DetailViewBox $hasId={!!id}>
                                {id ? (
                                    <Outlet context={{ bookings, refreshData }} />
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "250px", textAlign: "center" }}>
                                        Välj en bokning i listan till vänster för att se detaljer.
                                    </Typography>
                                )}
                            </S.DetailViewBox>
                        </S.ContentPaper>
                    </>
                )}

                {/* MOBIL KALENDER */}
                {isMobile && mobileTab === 1 && (
                    <S.ContentPaper sx={{ flex: 1 }}>
                        <Typography variant="h6" p={2} fontWeight="bold">
                            Kalender
                        </Typography>
                        <GoogleCalendar events={events} loading={calLoading} clickedId={clickedId} hoveredBookingId={hoveredBookingId} />
                    </S.ContentPaper>
                )}
            </S.MainContainer>

            <Drawer
                anchor="bottom"
                open={!!id && isMobile}
                onClose={() => navigate("/admin/bookings")}
                disableEnforceFocus
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{ sx: { height: "85vh", borderTopLeftRadius: 32, borderTopRightRadius: 32 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Outlet context={{ bookings, refreshData }} />
                </Box>
            </Drawer>
        </>
    );
}

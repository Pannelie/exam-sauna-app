import { useState, useEffect } from "react";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { Typography, useMediaQuery, useTheme, Box, CircularProgress } from "@mui/material";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { useBookings } from "./hooks/useBookings";
import { ViewSwitcher } from "./components/ViewSwitcher/ViewSwitcher";
import { GoogleCalendar } from "../calendar/GoogleCalendar";
import { useCalendar } from "../calendar/hooks/useCalendar";
import { BookingFilters } from "./components/BookingFilters/BookingFilters";
import { MobileBottomSheet } from "../../components/MobileBottomSheet/MobileBottomSheet";

export default function AllBookings() {
    const { bookings, loading, tabIndex, setTabIndex, searchTerm, setSearchTerm, filteredBookings } = useBookings();
    const { setClickedId, setHoveredBookingId } = useCalendar();
    const { id } = useParams();
    const isSelectedVisible = filteredBookings.some((b) => String(b.id) === id);
    const [mobileTab, setMobileTab] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const categories = ["Nya", "Bekräftade", "Nekade", "Avbokade", "Alla"];

    useEffect(() => {
        setClickedId(id || null);
    }, [id, setClickedId]);

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
                        <BookingFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                            categories={categories}
                            isMobile={isMobile}
                        />

                        <S.ScrollableList onMouseLeave={() => setHoveredBookingId(null)}>
                            {loading && filteredBookings.length === 0 ? (
                                <S.DefaultBox sx={{ display: "flex", justifyContent: "center", py: 8, width: "100%" }}>
                                    <CircularProgress color="primary" />
                                </S.DefaultBox>
                            ) : filteredBookings.length === 0 ? (
                                <S.DefaultBox>
                                    {bookings.length === 0 ? (
                                        <>
                                            <Typography variant="body1" color="common.white">
                                                {`Inga ${categories[tabIndex].toLocaleLowerCase()} bokningar just nu.`}
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="body1" color="common.white">
                                                Inga bokningar matchar din sökning.
                                            </Typography>
                                            <Typography variant="body1" color="common.white">
                                                Titta i en annan kategori eller ändra sökordet för att hitta bokningar.
                                            </Typography>
                                        </>
                                    )}
                                </S.DefaultBox>
                            ) : (
                                filteredBookings.map((b) => (
                                    <BookingCard
                                        key={b.id}
                                        booking={b}
                                        selectedId={isSelectedVisible ? id : undefined}
                                        onMouseEnter={() => setHoveredBookingId(b.id)}
                                        onMouseLeave={() => setHoveredBookingId(null)}
                                    />
                                ))
                            )}
                        </S.ScrollableList>
                    </S.ListWrapper>
                )}

                {/* DESKTOP VYER */}
                {!isMobile && (
                    <>
                        <GoogleCalendar xs={{ flex: 1 }} />

                        <S.ContentPaper sx={{ flex: 1, maxWidth: "400px" }}>
                            <S.DetailViewBox $hasId={!!id}>
                                {id ? (
                                    <Outlet context={{ bookings }} />
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                                        Välj en bokning i listan eller kalendern för att se detaljer.
                                    </Typography>
                                )}
                            </S.DetailViewBox>
                        </S.ContentPaper>
                    </>
                )}

                {/* MOBIL KALENDER */}
                {isMobile && mobileTab === 1 && <GoogleCalendar />}
            </S.MainContainer>
            <MobileBottomSheet open={!!id && isMobile} onClose={() => navigate("/admin/bookings")}>
                <Outlet context={{ bookings }} />
            </MobileBottomSheet>
        </>
    );
}

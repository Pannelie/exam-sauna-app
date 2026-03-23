import { useState, useEffect } from "react";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { BookingCardSkeleton } from "./components/BookingCardSkeleton/BookingCardSkeleton";
import { Typography, Drawer, useMediaQuery, useTheme, Box, FormControl, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { useBookings } from "./hooks/useBookings";
import { ViewSwitcher } from "./components/ViewSwitcher/ViewSwitcher";
import { GoogleCalendar } from "../calendar/GoogleCalendar";
import { useCalendar } from "../calendar/hooks/useCalendar";

export default function AllBookings() {
    const { bookings, loading, tabIndex, setTabIndex, searchTerm, setSearchTerm, filteredBookings, refreshData } = useBookings();
    const { events, loading: calLoading, refreshCalendar, clickedId, setClickedId, hoveredBookingId, setHoveredBookingId } = useCalendar();
    const [mobileTab, setMobileTab] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const categories = ["Alla", "Nya", "Bekräftade", "Nekade", "Avbokade"];

    useEffect(() => {
        setClickedId(id || null);
    }, [id, setClickedId]);

    const handleGlobalUpdate = async () => {
        await Promise.all([refreshData(), refreshCalendar()]);
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
                        {isMobile ? (
                            <S.CategoryScrollContainer>
                                {categories.map((c, i) => (
                                    <S.Pill key={c} active={tabIndex === i} onClick={() => setTabIndex(i)}>
                                        {c}
                                    </S.Pill>
                                ))}
                            </S.CategoryScrollContainer>
                        ) : (
                            <S.SearchContainer>
                                <S.StyledTextField
                                    placeholder="Sök namn eller ID..."
                                    size="small"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControl fullWidth size="small">
                                    <S.StyledSelect value={tabIndex} onChange={(e) => setTabIndex(Number(e.target.value))}>
                                        {categories.map((c, i) => (
                                            <MenuItem key={c} value={i}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </S.StyledSelect>
                                </FormControl>
                            </S.SearchContainer>
                        )}

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
                                      />
                                  ))}

                            {!loading && filteredBookings.length === 0 && (
                                <Typography variant="body2" sx={{ textAlign: "center", mt: 4, color: "rgba(255,255,255,0.6)" }}>
                                    Inga bokningar matchar din sökning
                                </Typography>
                            )}
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
                                    <Outlet context={{ bookings, refreshData, refreshCalendar }} />
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
                PaperProps={{ sx: { height: "85vh", borderTopLeftRadius: 32, borderTopRightRadius: 32 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Outlet context={{ bookings, refreshData, refreshCalendar }} />
                </Box>
            </Drawer>
        </>
    );
}

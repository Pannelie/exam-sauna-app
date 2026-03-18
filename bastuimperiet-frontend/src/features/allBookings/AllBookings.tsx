import { useState } from "react";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { BookingCardSkeleton } from "./components/BookingCardSkeleton/BookingCardSkeleton";
import { Typography, Drawer, useMediaQuery, useTheme, Box, FormControl, MenuItem, Select, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { useBookings } from "./hooks/useBookings";
import { ViewSwitcher } from "./components/ViewSwitcher/ViewSwitcher";

export default function AllBookings() {
    const { bookings, loading, tabIndex, setTabIndex, searchTerm, setSearchTerm, filteredBookings } = useBookings();
    const [mobileTab, setMobileTab] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

    const categories = ["Alla", "Nya", "Bekräftade", "Nekade", "Avbokade"];

    return (
        <>
            {/* MOBIL-ONLY: Switch högst upp */}
            {isMobile && (
                <Box sx={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                    <ViewSwitcher value={mobileTab} onChange={setMobileTab} />
                </Box>
            )}
            {/* HUVUDCONTAINER */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 2 : 4,
                    overflow: "hidden",
                }}
            >
                {/* VÄNSTER: LIST-KONTROLLER & LISTA */}
                {(!isMobile || mobileTab === 0) && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            // flex: 1 gör att den tar tillgänglig plats
                            flex: 1,
                            // Ingen begränsning på mobil (xs), 400px på desktop (md)
                            maxWidth: { xs: "none", md: "400px" },
                            gap: 2,
                            width: "100%",
                            minHeight: 0,
                            height: "100%",
                        }}
                    >
                        {/* FILTRERINGSDEL */}
                        {isMobile ? (
                            <S.CategoryScrollContainer>
                                {categories.map((c, i) => (
                                    <S.Pill key={c} active={tabIndex === i} onClick={() => setTabIndex(i)}>
                                        {c}
                                    </S.Pill>
                                ))}
                            </S.CategoryScrollContainer>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
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
                                    sx={{ bgcolor: "white", borderRadius: "8px" }}
                                />
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={tabIndex}
                                        onChange={(e) => setTabIndex(Number(e.target.value))}
                                        sx={{ bgcolor: "white", borderRadius: "8px", fontWeight: "bold" }}
                                    >
                                        {categories.map((c, i) => (
                                            <MenuItem key={c} value={i}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        )}

                        {/* SJÄLVA LISTAN */}
                        <Box sx={{ flex: 1, overflowY: "auto", pr: 1, "&::-webkit-scrollbar": { display: "none" } }}>
                            {loading
                                ? Array.from(new Array(5)).map((_, i) => <BookingCardSkeleton key={i} />)
                                : filteredBookings.map((b) => <BookingCard key={b.id} booking={b} />)}

                            {!loading && filteredBookings.length === 0 && (
                                <Typography variant="body2" sx={{ textAlign: "center", mt: 4, color: "rgba(255,255,255,0.6)" }}>
                                    Inga bokningar matchar din sökning
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}

                {/* MITTEN & HÖGER (Desktop) */}
                {!isMobile && (
                    <>
                        <S.ContentPaper sx={{ flex: 1 }}>
                            <Typography variant="h6" p={2} fontWeight="bold">
                                Kalenderöversikt
                            </Typography>
                            <S.CalendarPlaceholder>[Kalender]</S.CalendarPlaceholder>
                        </S.ContentPaper>

                        <S.ContentPaper sx={{ flex: 1, maxWidth: "400px" }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    // Centrera bara om vi INTE har ett ID (alltså inget valt)
                                    justifyContent: id ? "flex-start" : "center",
                                    alignItems: id ? "stretch" : "center",
                                    p: 4,
                                    height: "100%",
                                    overflowY: "auto", // Scrolla inuti boxen om innehållet är långt
                                }}
                            >
                                {id ? (
                                    <Outlet context={{ bookings }} />
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "250px", textAlign: "center" }}>
                                        Välj en bokning i listan till vänster för att se detaljer.
                                    </Typography>
                                )}
                            </Box>
                        </S.ContentPaper>
                    </>
                )}

                {/* MOBIL KALENDER-LÄGE */}
                {isMobile && mobileTab === 1 && (
                    <S.ContentPaper sx={{ flex: 1 }}>
                        <Typography variant="h6" p={2} fontWeight="bold">
                            Kalender
                        </Typography>
                        <S.CalendarPlaceholder>[Mobil-kalender]</S.CalendarPlaceholder>
                    </S.ContentPaper>
                )}
            </Box>

            {/* MOBIL DRAWER */}
            <Drawer
                anchor="bottom"
                open={!!id && isMobile}
                onClose={() => navigate("/admin/bookings")}
                PaperProps={{ sx: { height: "85vh", borderTopLeftRadius: 32, borderTopRightRadius: 32 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Outlet context={{ bookings }} />
                </Box>
            </Drawer>
        </>
    );
}

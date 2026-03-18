import { useState, useEffect, useMemo } from "react";
import { getAllBookings } from "./services/allBookingsService";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { BookingCardSkeleton } from "./components/BookingCardSkeleton/BookingCardSkeleton";
import {
    Typography,
    Tabs,
    Tab,
    Drawer,
    useMediaQuery,
    useTheme,
    Box,
    FormControl,
    MenuItem,
    Select,
    TextField,
    InputAdornment,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import * as S from "./AllBookings.styles";
import { filterBookingsByTab } from "./utils/bookingHelpers";
import type { ApiBookingData } from "../../types/bookingTypes";

export default function AllBookings() {
    const [bookings, setBookings] = useState<ApiBookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [mobileTab, setMobileTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Ny state för sökning

    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                setBookings(data);
            } catch (error) {
                console.error("Misslyckades:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // Uppdaterad filtrering som tar hänsyn till både flik och sökord
    const filteredBookings = useMemo(() => {
        const tabFiltered = filterBookingsByTab(bookings, tabIndex);
        if (!searchTerm) return tabFiltered;

        return tabFiltered.filter(
            (b) => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [bookings, tabIndex, searchTerm]);

    const categories = ["Alla", "Nya", "Bekräftade", "Nekade", "Avbokade"];

    return (
        <>
            {/* MOBIL-ONLY: Switch högst upp */}
            {isMobile && (
                <Box sx={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                    <Tabs
                        value={mobileTab}
                        onChange={(_, v) => setMobileTab(v)}
                        sx={{
                            bgcolor: "rgba(0,0,0,0.2)",
                            borderRadius: "22px",
                            "& .MuiTabs-indicator": { height: "100%", borderRadius: "20px", bgcolor: "white" },
                        }}
                    >
                        <Tab icon={<ListIcon fontSize="small" />} value={0} />
                        <Tab icon={<CalendarMonthIcon fontSize="small" />} value={1} />
                    </Tabs>
                </Box>
            )}

            {/* HUVUDCONTAINER */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                    overflow: "hidden",
                }}
            >
                {/* VÄNSTER: LIST-KONTROLLER & LISTA */}
                {(!isMobile || mobileTab === 0) && (
                    <Box
                        sx={{
                            width: { xs: "100%", md: "320px" },
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            height: "100%",
                        }}
                    >
                        {/* FILTRERINGSDEL */}
                        <Box sx={{ mb: 2 }}>
                            {isMobile ? (
                                <S.CategoryScrollContainer>
                                    {categories.map((c, i) => (
                                        <S.Pill key={c} active={tabIndex === i} onClick={() => setTabIndex(i)}>
                                            {c}
                                        </S.Pill>
                                    ))}
                                </S.CategoryScrollContainer>
                            ) : (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
                        </Box>

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
                        <S.ContentPaper sx={{ flex: 1, minWidth: "400px" }}>
                            <Typography variant="h6" p={2} fontWeight="bold">
                                Kalenderöversikt
                            </Typography>
                            <S.CalendarPlaceholder>[Kalender]</S.CalendarPlaceholder>
                        </S.ContentPaper>

                        <S.ContentPaper sx={{ minWidth: "420px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "gray",
                                    p: 4,
                                    textAlign: "center",
                                }}
                            >
                                {id ? (
                                    <Outlet context={{ bookings }} />
                                ) : (
                                    <Typography variant="body1">Välj en bokning i listan till vänster för att se detaljer.</Typography>
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

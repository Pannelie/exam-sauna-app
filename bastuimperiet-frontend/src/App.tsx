import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { HomePage, AdminPage, BookingDetailsPage, BookingsPage } from "./pages";
import { MainLayout } from "./components/MainLayout/MainLayout";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin/login" element={<AdminPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/bookings" element={<BookingsPage />} />
                        <Route path="/admin/bookings/:id" element={<BookingDetailsPage />} />
                        <Route path="/admin/profiles" element={<AdminPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

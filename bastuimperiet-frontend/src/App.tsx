import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { HomePage, AdminPage, BookingsPage, BookingDetailsPage } from "./pages";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AdminPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/bookings" element={<BookingsPage />} />
                    <Route path="/admin/bookings/:id" element={<BookingDetailsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ThemeProvider>
    );
}

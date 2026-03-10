import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { HomePage, LoginPage, BookingsPage, BookingDetailsPage } from "./pages";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* 
            <Route element={<ProtectedRoute />}> */}
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/bookings/:id" element={<BookingDetailsPage />} />
                {/* </Route> */}

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </ThemeProvider>
    );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { HomePage, LoginPage, BookingsPage, BookingDetailsPage } from "./pages";

export default function App() {
    return (
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
    );
}

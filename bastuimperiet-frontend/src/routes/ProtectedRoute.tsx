import { Navigate, Outlet, useLocation } from "react-router-dom";

const ADMIN_TOKEN_KEY = "adminToken";

export function ProtectedRoute() {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

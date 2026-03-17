import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

const ADMIN_TOKEN_KEY = "adminToken";

export function ProtectedRoute() {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        // Kolla om token har gått ut (exp är i sekunder)
        if (!decodedToken.exp || decodedToken.exp < currentTime) {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            return <Navigate to="/admin/login" replace state={{ from: location }} />;
        }
    } catch (error) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

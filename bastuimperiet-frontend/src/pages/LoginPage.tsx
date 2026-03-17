import { Navigate } from "react-router-dom";
import { AdminLogin } from "../features/admin/components/LoginForm/LoginForm";

export const LoginPage = () => {
    const isLoggedIn = !!localStorage.getItem("adminToken");

    if (isLoggedIn) {
        return <Navigate to="/admin/bookings" replace />;
    }

    return <AdminLogin onLoginSuccess={() => window.location.reload()} />;
};

import { Navigate, useNavigate } from "react-router-dom";
import { AdminLogin } from "../features/admin/components/LoginForm/LoginForm";

export const LoginPage = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("adminToken");

    if (isLoggedIn) {
        return <Navigate to="/admin/bookings" replace />;
    }

    const handleLoginSuccess = () => {
        navigate("/admin/bookings", { replace: true });
    };

    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
};

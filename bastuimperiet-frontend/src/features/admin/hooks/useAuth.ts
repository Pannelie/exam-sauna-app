import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("adminToken"));
    const [email, setEmail] = useState(localStorage.getItem("adminEmail"));

    const login = (token: string, email: string) => {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminEmail", email);
        setToken(token);
        setEmail(email);
        navigate("/admin/bookings");
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        setToken(null);
        setEmail(null);
        navigate("/admin/login");
    };
    return { isLoggedIn: !!token, adminEmail: email, login, logout };
};

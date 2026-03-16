import { useState } from "react";
import { AdminLogin } from "../features/admin/components/LoginForm/LoginForm";
import { AdminList } from "../features/admin/components/AdminList/AdminList";
import { LogoutBtn } from "../features/admin/components/LogoutBtn/LogoutBtn";

export const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));

    const loggedInEmail = localStorage.getItem("adminEmail");
    // En enkel funktion för att "logga ut" i mock-syfte
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail"); // Rensa även email vid utloggning
        setIsLoggedIn(false);
    };
    return (
        <main className="home_main home_main--centered">
            {isLoggedIn ? (
                /* Skicka med den riktiga inloggade mejlen till listan */
                <>
                    <LogoutBtn onLogout={handleLogout} />
                    <AdminList myEmail={loggedInEmail || ""} />
                </>
            ) : (
                <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
        </main>
    );
};

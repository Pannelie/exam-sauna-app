import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import MenuBar from "../MenuBar/MenuBar";
import { ProfileMenuCard } from "../../features/admin/components/ProfileMenuCard/ProfileMenuCard";
import { useAdminsStore } from "../../features/admin/stores/useAdminsStore";

export const MainLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAdmin = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

    const fetchMyProfile = useAdminsStore((state) => state.fetchMyProfile);
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);

    const loadAdminData = useCallback(async () => {
        await fetchMyProfile();
        await fetchAdmins();
    }, [fetchMyProfile, fetchAdmins]);

    useEffect(() => {
        loadAdminData();
    }, [loadAdminData]);

    if (isLoginPage) {
        return (
            <main className="home_main home_main--centered">
                <Outlet />
            </main>
        );
    }
    // Definiera meny-val baserat på URL
    const menuItems = [
        { label: "Bokningar", onClick: () => navigate("/admin/bookings") },
        { label: "Ny bokning", onClick: () => navigate("/admin/new-booking") },
    ];

    // ----------- hämta inloggad admin info från global store/service istället för att hårdkoda -----------
    const actionComponent = <ProfileMenuCard />;

    return (
        <>
            <MenuBar menuItems={menuItems} actionComponent={actionComponent} showActionOnMobile={isAdmin} />
            <main className={`admin_main`}>
                <Outlet />
            </main>
        </>
    );
};

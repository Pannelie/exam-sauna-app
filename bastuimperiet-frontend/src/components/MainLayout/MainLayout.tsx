import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import MenuBar from "../MenuBar/MenuBar";
import { ProfileMenuCardContainer } from "../../features/admin/components/ProfileMenuCardContainer/ProfileMenuCardContainer";
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

    const menuItems = [
        { label: "Bokningar", onClick: () => navigate("/admin/bookings") },
        { label: "Ny bokning", onClick: () => navigate("/admin/new-booking") },
    ];
    const actionComponent = <ProfileMenuCardContainer />;

    return (
        <>
            <MenuBar menuItems={menuItems} actionComponent={actionComponent} showActionOnMobile={isAdmin} />
            <main className={`admin_main`}>
                <Outlet />
            </main>
        </>
    );
};

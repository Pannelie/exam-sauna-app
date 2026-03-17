import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import { ProfileMenuCard } from "../../features/admin/components/ProfileMenuCard/ProfileMenuCard";

export const MainLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAdmin = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

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
        { label: "Profiler", onClick: () => navigate("/admin/profiles") },
    ];

    // Bestäm vilken knapp som ska synas till höger
    const actionComponent = <ProfileMenuCard user={{ name: "Jacob", email: "jacob@exempel.se" }} />;

    return (
        <>
            <MenuBar menuItems={menuItems} actionComponent={actionComponent} showActionOnMobile={isAdmin} />
            <main className={`home_main home_main--centered`}>
                <Outlet />
            </main>
        </>
    );
};

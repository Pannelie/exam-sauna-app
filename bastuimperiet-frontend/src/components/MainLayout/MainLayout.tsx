import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import { ProfileMenuCard } from "../../features/admin/components/ProfileMenuCard/ProfileMenuCard";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { scrollToSection } from "../../utils/scrollToSection";

export const MainLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAdmin = pathname.startsWith("/admin");

    // Definiera meny-val baserat på URL
    const menuItems = isAdmin
        ? [
              { label: "Bokningar", onClick: () => navigate("/admin/bookings") },
              { label: "Profiler", onClick: () => navigate("/admin/profiles") },
          ]
        : [
              { label: "Info", onClick: () => scrollToSection("info") },
              { label: "Priser", onClick: () => scrollToSection("priser") },
              { label: "Kontakt", onClick: () => scrollToSection("kontakt") },
          ];

    // Bestäm vilken knapp som ska synas till höger
    const actionComponent = isAdmin ? (
        <ProfileMenuCard user={{ name: "Jacob", email: "jacob@exempel.se" }} />
    ) : (
        <BookNowButton onClick={() => scrollToSection("booking")} />
    );

    return (
        <>
            <MenuBar menuItems={menuItems} actionComponent={actionComponent} showActionOnMobile={isAdmin} />
            <main className={`home_main ${isAdmin ? "home_main--centered" : ""}`}>
                <Outlet />
            </main>
        </>
    );
};

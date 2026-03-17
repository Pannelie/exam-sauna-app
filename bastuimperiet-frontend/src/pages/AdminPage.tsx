import { AdminList } from "../features/admin/components/AdminList/AdminList";

export const AdminPage = () => {
    const loggedInEmail = localStorage.getItem("adminEmail");

    return (
        <div className="admin-container">
            <h1>Personaladministration</h1>
            <AdminList myEmail={loggedInEmail || ""} />
        </div>
    );
};

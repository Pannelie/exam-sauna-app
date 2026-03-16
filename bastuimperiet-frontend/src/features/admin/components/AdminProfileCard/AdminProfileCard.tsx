import { Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { AdminBaseCard } from "../AdminbaseCard/AdminbaseCard";

export const AdminProfileCard = ({ admin, isMe }: { admin: any; isMe: boolean }) => {
    return (
        <AdminBaseCard active={isMe}>
            {/* Om det är "Jag", visa redigeringspenna uppe i hörnet */}
            {isMe && (
                <IconButton sx={{ position: "absolute", right: 8, top: 8, color: "#4a1a1a" }}>
                    <EditIcon fontSize="small" />
                </IconButton>
            )}

            <AccountCircleIcon sx={{ fontSize: 80, color: "#4a1a1a", mb: 1 }} />

            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4a1a1a" }}>
                {admin.username}
            </Typography>

            <Typography sx={{ fontSize: "0.9rem", color: "#4a1a1a" }}>{admin.fullName}</Typography>

            <Typography sx={{ fontSize: "0.8rem", color: "#4a1a1a", mt: 1 }}>{admin.phone}</Typography>
        </AdminBaseCard>
    );
};

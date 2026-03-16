// features/admins/components/AdminList.tsx
import { AdminProfileCard } from "../AdminProfileCard/AdminProfileCard";
import { IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const MOCK_ADMINS = [
    { id: "1", username: "BASTUJAKE", fullName: "JACOB ÖSTELID", phone: "070 -123 45 67", email: "jacob@bastu.se" },
    { id: "2", username: "BASTUJOHANNES", fullName: "JOHANNES LARSSON", phone: "070 -123 45 67", email: "johannes@bastu.se" },
    { id: "3", username: "BASTUANNELIE", fullName: "Annelie Östelid", phone: "070 -987 65 43", email: "annelie.ostelid@outlook.com" },
];

export const AdminList = ({ onLogout, myEmail }: { onLogout: () => void; myEmail: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {MOCK_ADMINS.map((admin) => {
                // Här inne definierar vi isMe för varje enskild admin i loopen
                const isMe = admin.email === myEmail;

                return (
                    <Box key={admin.id} sx={{ width: 300 }}>
                        {/* AdminProfileCard använder AdminBaseCard internt */}
                        <AdminProfileCard admin={admin} isMe={isMe} />
                    </Box>
                );
            })}

            {/* Endast "Jag" får redigera-knappen */}
            {MOCK_ADMINS.map((admin) => {
                const isMe = admin.email === myEmail;
                return isMe ? (
                    <IconButton key={admin.id} onClick={onLogout}>
                        <EditIcon />
                    </IconButton>
                ) : null;
            })}
        </Box>
    );
};

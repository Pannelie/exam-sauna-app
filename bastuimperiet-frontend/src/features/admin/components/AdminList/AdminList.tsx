// features/admins/components/AdminList.tsx
import { AdminProfileCard } from "../AdminProfileCard/AdminProfileCard";
import { Box } from "@mui/material";

const MOCK_ADMINS = [
    { id: "1", username: "BASTUJAKE", fullName: "JACOB ÖSTELID", phone: "070 -123 45 67", email: "jacob@bastu.se" },
    { id: "2", username: "BASTUJOHANNES", fullName: "JOHANNES LARSSON", phone: "070 -123 45 67", email: "johannes@bastu.se" },
    { id: "3", username: "BASTUANNELIE", fullName: "Annelie Östelid", phone: "070 -987 65 43", email: "annelie.ostelid@outlook.com" },
];

const sortedAdmins = (myEmail: string) =>
    [...MOCK_ADMINS].sort((a, b) => {
        if (a.email === myEmail) return -1; // a är jag, flytta till början
        if (b.email === myEmail) return 1; // b är jag, flytta a bakåt
        return 0; // Ingen av dem är jag, behåll ordning
    });

export const AdminList = ({ myEmail }: { myEmail: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {sortedAdmins(myEmail).map((admin) => {
                // Här inne definierar vi isMe för varje enskild admin i loopen
                const isMe = admin.email === myEmail;

                return (
                    <Box key={admin.id} sx={{ width: 300 }}>
                        {/* AdminProfileCard använder AdminBaseCard internt */}
                        <AdminProfileCard admin={admin} isMe={isMe} />
                    </Box>
                );
            })}
        </Box>
    );
};

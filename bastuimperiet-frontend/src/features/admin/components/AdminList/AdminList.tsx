// features/admins/components/AdminList.tsx
import { useCallback, useEffect } from "react";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { AdminProfileCard } from "../AdminProfileCard/AdminProfileCard";
import { Box } from "@mui/material";

export const AdminList = () => {
    const admins = useAdminsStore((state) => state.admins);
    const myProfile = useAdminsStore((state) => state.myProfile);

    // 🔹 Memoiserade funktioner från store
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const fetchMyProfile = useAdminsStore((state) => state.fetchMyProfile);

    // 🔹 Wrap i useCallback så de är stabila för useEffect
    const loadAdmins = useCallback(async () => {
        await fetchAdmins();
        await fetchMyProfile();
    }, [fetchAdmins, fetchMyProfile]);

    useEffect(() => {
        loadAdmins();
        console.log("Admins loaded:", admins);
    }, [loadAdmins]);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {admins.map((admin) => {
                console.log("Admin email:", admin.email);
                console.log("My profile email:", myProfile?.email);

                // Här inne definierar vi isMe för varje enskild admin i loopen
                const isMe = admin.email === myProfile?.email;

                return (
                    <Box key={admin.email} sx={{ width: 300 }}>
                        {/* AdminProfileCard använder AdminBaseCard internt */}
                        <AdminProfileCard admin={admin} isMe={isMe} />
                    </Box>
                );
            })}
        </Box>
    );
};

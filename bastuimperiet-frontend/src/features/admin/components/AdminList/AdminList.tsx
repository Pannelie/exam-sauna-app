import { useCallback, useEffect } from "react";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { AdminListCard } from "../AdminListCard/AdminListCard";
import * as S from "./adminList.style";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const AdminList = () => {
    const admins = useAdminsStore((state) => state.admins);
    const myProfile = useAdminsStore((state) => state.myProfile);
    const fetchAdmins = useAdminsStore((state) => state.fetchAdmins);
    const fetchMyProfile = useAdminsStore((state) => state.fetchMyProfile);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const loadAdmins = useCallback(async () => {
        await fetchAdmins();
        await fetchMyProfile();
    }, [fetchAdmins, fetchMyProfile]);

    useEffect(() => {
        loadAdmins();
    }, [loadAdmins]);

    return (
        <S.StyledList isMobile={isMobile}>
            {admins.map((admin) => {
                const isMe = admin.email === myProfile?.email;
                return <AdminListCard key={admin.email} admin={admin} isMe={isMe} />;
            })}
        </S.StyledList>
    );
};

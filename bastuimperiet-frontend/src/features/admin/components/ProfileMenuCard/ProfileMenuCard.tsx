import * as S from "./profileMenuCard.style";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type { AdminProfile } from "../../types/adminTypes";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";

export const ProfileMenuCard = ({ myProfile }: { myProfile: AdminProfile }) => {
    return (
        <S.DropdownCard className="dropdown-card" elevation={4} sx={{ gap: 0.5 }}>
            <AccountCircleIcon sx={{ fontSize: 60, mb: 1 }} />
            <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                {myProfile?.username || "namn saknas"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {myProfile?.email || "email saknas"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                {myProfile?.phone || "telefon saknas"}
            </Typography>

            <LogoutBtn />
        </S.DropdownCard>
    );
};

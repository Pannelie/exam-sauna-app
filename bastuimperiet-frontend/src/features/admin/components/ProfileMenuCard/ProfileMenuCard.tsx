import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import * as S from "./profileMenuCard.style";
import { useAdminsStore } from "../../stores/useAdminsStore";

export function ProfileMenuCard() {
    const navigate = useNavigate();
    const myProfile = useAdminsStore((state) => state.myProfile);

    return (
        <S.UserWrapper>
            {/* Klick på ikonen tar en till admin-listan */}
            <IconButton onClick={() => navigate("/admin/profiles")} sx={{ color: "white" }}>
                <AccountCircleIcon sx={{ fontSize: 40, mb: 1 }} />
            </IconButton>

            {/* Hover-kortet */}
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
        </S.UserWrapper>
    );
}

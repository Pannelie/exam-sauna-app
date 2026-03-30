import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import * as S from "./profileMenuCardContainer.style";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { ProfileMenuCard } from "../ProfileMenuCard/ProfileMenuCard";

export function ProfileMenuCardContainer() {
    const navigate = useNavigate();
    const myProfile = useAdminsStore((state) => state.myProfile);

    return (
        <S.UserWrapper>
            {/* Klick på ikonen tar en till admin-listan */}
            <IconButton onClick={() => navigate("/admin/profiles")} sx={{ color: "white" }}>
                <AccountCircleIcon sx={{ fontSize: 40, mb: 1 }} />
            </IconButton>

            {/* Hover-kortet */}
            {myProfile && <ProfileMenuCard myProfile={myProfile} />}
        </S.UserWrapper>
    );
}

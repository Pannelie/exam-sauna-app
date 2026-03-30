import * as S from "./profileMenuCard.style";
import type { AdminProfile } from "../../types/adminTypes";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";

export const ProfileMenuCard = ({ myProfile, isMobile = false }: { myProfile: AdminProfile; isMobile?: boolean }) => {
    return (
        <S.DropdownCard className="dropdown-card" elevation={4} $isMobile={isMobile}>
            <S.StyledAccountIcon $isMobile={isMobile} />
            <S.ProfileName variant={isMobile ? "body1" : "h6"}>{myProfile?.username || "namn saknas"}</S.ProfileName>
            <S.ProfileEmail variant="body2">{myProfile?.email || "email saknas"}</S.ProfileEmail>
            <S.ProfilePhone variant="body2">{myProfile?.phone || "telefon saknas"}</S.ProfilePhone>

            <LogoutBtn />
        </S.DropdownCard>
    );
};

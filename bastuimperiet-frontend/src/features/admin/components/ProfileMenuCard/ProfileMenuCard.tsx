import * as S from "./profileMenuCard.style";
import type { AdminProfile } from "../../types/adminTypes";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";

export const ProfileMenuCard = ({ myProfile }: { myProfile: AdminProfile }) => {
    return (
        <S.DropdownCard className="dropdown-card" elevation={4}>
            <S.StyledAccountIcon />
            <S.ProfileName variant="h6">{myProfile?.username || "namn saknas"}</S.ProfileName>
            <S.ProfileEmail variant="body2">{myProfile?.email || "email saknas"}</S.ProfileEmail>
            <S.ProfilePhone variant="body2">{myProfile?.phone || "telefon saknas"}</S.ProfilePhone>

            <LogoutBtn />
        </S.DropdownCard>
    );
};

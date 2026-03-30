import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as S from "./profileMenuCardContainer.style";
import { useAdminsStore } from "../../stores/useAdminsStore";
import { ProfileMenuCard } from "../ProfileMenuCard/ProfileMenuCard";

export function ProfileMenuCardContainer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const myProfile = useAdminsStore((state) => state.myProfile);

    if (isMobile) {
        return myProfile ? <ProfileMenuCard myProfile={myProfile} isMobile /> : null;
    }

    return (
        <S.UserWrapper>
            <IconButton sx={{ color: "white" }}>
                <AccountCircleIcon sx={{ fontSize: 40, mb: 1 }} />
            </IconButton>
            {myProfile && <ProfileMenuCard myProfile={myProfile} />}
        </S.UserWrapper>
    );
}

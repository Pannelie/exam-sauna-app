import { Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import * as S from "./adminProfileCard.style";

export const AdminProfileCard = ({ admin, isMe }: { admin: any; isMe: boolean }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <S.StyledProfileCard active={isMe} isMobile={isMobile}>
            {/* Om det är "Jag", visa redigeringspenna uppe i hörnet */}
            {isMe && (
                <IconButton sx={{ position: "absolute", right: 8, top: 8, color: "#4a1a1a" }}>
                    <EditIcon fontSize="small" />
                </IconButton>
            )}

            <AccountCircleIcon sx={{ fontSize: 80, color: "#4a1a1a", mb: 1 }} />

            <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: "bold", color: "#4a1a1a" }}>
                {admin.username}
            </Typography>

            <Typography sx={{ fontSize: "0.9rem", color: "#4a1a1a" }}>{admin.email}</Typography>

            <Typography sx={{ fontSize: "0.8rem", color: "#4a1a1a", mt: 2 }}>{admin.phone}</Typography>
        </S.StyledProfileCard>
    );
};

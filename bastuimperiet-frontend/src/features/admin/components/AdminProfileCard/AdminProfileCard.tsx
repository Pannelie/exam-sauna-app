import { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MobileBottomSheet } from "../../../../components/MobileBottomSheet/MobileBottomSheet";
import * as S from "./adminProfileCard.style";
import { AdminForm } from "../AdminForm/AdminForm";
import { BasicDialog } from "../../../../components/BasicDialog/BasicDialog";

export const AdminProfileCard = ({ admin, isMe }: { admin: any; isMe: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const onEditClick = () => {
        setIsEditing(!isEditing);
        setOpen(!open);
    };

    return (
        <>
            <S.StyledProfileCard active={isMe} isMobile={isMobile}>
                {/* Om det är "Jag", visa redigeringspenna uppe i hörnet */}
                {isMe && (
                    <IconButton onClick={onEditClick} sx={{ position: "absolute", right: 8, top: 8, color: "#4a1a1a" }}>
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
            {isMobile ? (
                <MobileBottomSheet open={open} onClose={() => setOpen(false)}>
                    {/* Här kan du lägga in formuläret för att redigera profilen */}
                    <AdminForm />
                </MobileBottomSheet>
            ) : (
                <BasicDialog open={open} onClose={() => setOpen(false)}>
                    {/* Här kan du lägga in formuläret för att redigera profilen */}
                    <AdminForm />
                </BasicDialog>
            )}
        </>
    );
};

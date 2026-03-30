import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MobileBottomSheet } from "../../../../components/MobileBottomSheet/MobileBottomSheet";
import * as S from "./AdminListCard.style";
import { AdminForm } from "../AdminForm/AdminForm";
import { BasicDialog } from "../../../../components/BasicDialog/BasicDialog";

export const AdminListCard = ({ admin, isMe }: { admin: any; isMe: boolean }) => {
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
                    <S.EditButton onClick={onEditClick}>
                        <EditIcon fontSize="small" />
                    </S.EditButton>
                )}
                <S.ProfileAvatar />
                <S.AdminName variant="h6">{admin.username}</S.AdminName>
                <S.AdminEmail>{admin.email}</S.AdminEmail>
                <S.AdminPhone>{admin.phone}</S.AdminPhone>
            </S.StyledProfileCard>

            {isMobile ? (
                <MobileBottomSheet open={open} onClose={() => setOpen(false)}>
                    <AdminForm />
                </MobileBottomSheet>
            ) : (
                <BasicDialog open={open} onClose={() => setOpen(false)}>
                    <AdminForm />
                </BasicDialog>
            )}
        </>
    );
};

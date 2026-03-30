import * as S from "./basicDialog.style";

interface BasicDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export const BasicDialog = ({ open, onClose, children }: BasicDialogProps) => {
    return (
        <S.StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            {children}
        </S.StyledDialog>
    );
};

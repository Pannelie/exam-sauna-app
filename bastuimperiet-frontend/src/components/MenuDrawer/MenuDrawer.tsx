import { ListItem, ListItemButton } from "@mui/material";
import * as S from "./menuDrawer.style";

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    menuItems: { label: string; onClick: () => void }[];
    actionComponent?: React.ReactNode;
}

export const MenuDrawer = ({ open, onClose, menuItems, actionComponent }: MenuDrawerProps) => {
    return (
        <S.StyledDrawer anchor="right" open={open} onClose={onClose}>
            <S.StyledBox>
                <S.MenuList>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    item.onClick();
                                    onClose();
                                }}
                            >
                                <S.ItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </S.MenuList>
                {actionComponent && <S.BottomActionArea>{actionComponent}</S.BottomActionArea>}
            </S.StyledBox>
        </S.StyledDrawer>
    );
};

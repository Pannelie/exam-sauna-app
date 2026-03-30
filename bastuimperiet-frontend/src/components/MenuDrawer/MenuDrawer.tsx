import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
}));

const StyledBox = styled(Box)(() => ({
    width: 250,
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
}));

const MenuList = styled(List)(() => ({
    flexGrow: 1,
}));

const BottomActionArea = styled(Box)(({ theme }) => ({
    marginTop: "auto",
    padding: theme.spacing(1.5),
}));

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    menuItems: { label: string; onClick: () => void }[];
    actionComponent?: React.ReactNode; // Valfri för admin/user-logik
}

export const MenuDrawer = ({ open, onClose, menuItems, actionComponent }: MenuDrawerProps) => {
    return (
        <StyledDrawer anchor="right" open={open} onClose={onClose}>
            <StyledBox>
                <MenuList>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    item.onClick();
                                    onClose();
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </MenuList>
                {actionComponent && <BottomActionArea>{actionComponent}</BottomActionArea>}
            </StyledBox>
        </StyledDrawer>
    );
};

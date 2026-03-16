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
            <StyledBox onClick={onClose}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton onClick={item.onClick}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {actionComponent && <ListItem disablePadding>{actionComponent}</ListItem>}
                </List>
            </StyledBox>
        </StyledDrawer>
    );
};

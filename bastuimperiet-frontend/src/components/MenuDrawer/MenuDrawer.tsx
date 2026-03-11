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
    menuItems: { label: string; section: string }[];
    handleBookClick: () => void;
    handleMenuItemClick: (section: string) => void;
}

export const MenuDrawer = ({ open, onClose, menuItems, handleBookClick, handleMenuItemClick }: MenuDrawerProps) => {
    return (
        <StyledDrawer anchor="right" open={open} onClose={onClose}>
            <StyledBox onClick={onClose}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton onClick={() => handleMenuItemClick(item.section)}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleBookClick}>
                            <ListItemText primary="Boka" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </StyledBox>
        </StyledDrawer>
    );
};

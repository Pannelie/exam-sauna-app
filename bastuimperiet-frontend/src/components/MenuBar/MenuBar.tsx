import { useState, type JSX } from "react";

import { useMediaQuery, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { MenuDrawer } from "../MenuDrawer/MenuDrawer";
import * as S from "./menuBar.style";

interface MenuItem {
    label: string;
    onClick: () => void;
}
interface MenuBarProps {
    menuItems: MenuItem[];
    actionComponent: JSX.Element;
    showActionOnMobile?: boolean;
}

export default function MenuBar({ menuItems, actionComponent, showActionOnMobile = false }: MenuBarProps): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            {/* Desktop: Sticky menubar under hero */}
            {!isMobile && (
                <S.StyledAppBar>
                    <S.StyledToolbar>
                        <Typography variant="h1">Bastuimperiet</Typography>
                        {menuItems.map((item) => (
                            <S.MenuLink key={item.label} onClick={item.onClick}>
                                {item.label}
                            </S.MenuLink>
                        ))}
                        <Box>{actionComponent}</Box>
                    </S.StyledToolbar>
                </S.StyledAppBar>
            )}

            {/* Mobile: hamburgermeny ikon ovanpå hero */}
            {isMobile && (
                <>
                    <S.StyledMenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                    </S.StyledMenuButton>

                    <MenuDrawer
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        menuItems={menuItems}
                        actionComponent={showActionOnMobile ? actionComponent : undefined}
                    />
                </>
            )}
        </>
    );
}

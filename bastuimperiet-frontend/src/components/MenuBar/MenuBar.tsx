import "./menuBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/wood2.jpg";
import { AppBar, Toolbar, IconButton, useMediaQuery, styled, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { BookNowButton } from "../BookNowButton/BookNowButton";
import { scrollToSection } from "../../utils/scrollToSection";
import { MenuDrawer } from "../MenuDrawer/MenuDrawer";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: "sticky",
    top: 0,
    backgroundImage: `url(${bg})`,
    color: theme.palette.common.white,
    boxShadow: "none",
    padding: "1rem 0",
}));

const StyledToolbar = styled(Toolbar)(() => ({
    justifyContent: "space-evenly",
    minHeight: "var(--menubar-height)",
    padding: "0 1rem",
}));

const MenuLink = styled("a")(({ theme }) => ({
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 5),
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        transform: "scale(1.03)",
    },
    [theme.breakpoints.down("md")]: { fontSize: "0.95rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 1500,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: 48,
    height: 48,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export default function MenuBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuItems = [
        { label: "Info", section: "info" },
        { label: "Priser", section: "priser" },
        { label: "Kontakt", section: "kontakt" },
    ];

    const handleBookClick = () => scrollToSection("booking");
    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            {/* Desktop: Sticky menubar under hero */}
            {!isMobile && (
                <StyledAppBar>
                    <StyledToolbar>
                        <Typography variant="h1" onClick={() => navigate("/")}>
                            Bastuimperiet
                        </Typography>
                        {menuItems.map((item) => (
                            <MenuLink key={item.label} onClick={() => scrollToSection(item.section)}>
                                {item.label}
                            </MenuLink>
                        ))}
                        <BookNowButton onClick={handleBookClick} />
                    </StyledToolbar>
                </StyledAppBar>
            )}

            {/* Mobile: hamburgermeny ikon ovanpå hero */}
            {isMobile && (
                <>
                    <StyledMenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </StyledMenuButton>

                    <MenuDrawer
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                        menuItems={menuItems}
                        handleBookClick={handleBookClick}
                        handleMenuItemClick={scrollToSection}
                    />
                </>
            )}
        </>
    );
}

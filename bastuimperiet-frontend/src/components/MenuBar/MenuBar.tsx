import { useState } from "react";
import "./menuBar.css";
import bg from "../../assets/wood2.jpg";
import logo from "../../assets/wood__logo.jpg";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    Box,
    styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import BookNowButton from "../BookNowButton/BookNowButton";
import { scrollToSection } from "../../utils/scrollToSection";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundImage: `url(${bg})`,
    color: theme.palette.common.white,
    boxShadow: "none",
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

export default function MenuBar() {
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

    const drawer = (
        <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                scrollToSection(item.section);
                            }}
                        >
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
        </Box>
    );

    return (
        <>
            {/* Desktop: Sticky menubar under hero */}
            {!isMobile && (
                <StyledAppBar position="sticky" sx={{ top: 0 }}>
                    <Toolbar
                        sx={{
                            justifyContent: "space-evenly",
                            minHeight: "var(--menubar-height)",
                            padding: "0 1rem",
                        }}
                    >
                        <img src={logo} alt="Logo" className="menuBar_img" />
                        {menuItems.map((item) => (
                            <MenuLink key={item.label} onClick={() => scrollToSection(item.section)}>
                                {item.label}
                            </MenuLink>
                        ))}
                        <BookNowButton onClick={handleBookClick} />
                    </Toolbar>
                </StyledAppBar>
            )}

            {/* Mobile: hamburgermeny ikon ovanpå hero */}
            {isMobile && (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        sx={{
                            position: "fixed",
                            top: "1rem",
                            right: "1rem",
                            zIndex: 1500,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            "&:hover": { backgroundColor: theme.palette.primary.dark },
                            width: 48,
                            height: 48,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                        sx={{
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.common.white,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </>
            )}
        </>
    );
}

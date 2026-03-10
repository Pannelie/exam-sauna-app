import "./menuBar.css";
import { AppBar, Toolbar, Button, styled } from "@mui/material";
import bg from "../assets/wood2.jpg";
import logo from "../assets/wood__logo.jpg";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundImage: `url(${bg})`,
    color: theme.palette.common.white,
}));
const MenuLink = styled("a")(({ theme }) => ({
    color: "inherit",
    textDecoration: "none",
    transition: "background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 5),
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    "&:hover": {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        transform: "scale(1.03)",
    },
    [theme.breakpoints.down("md")]: { fontSize: "0.95rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 5),
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        transform: "scale(1.03)",
    },
}));

function MenuBar() {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    const handleBookClick = () => {
        scrollToSection("booking");
    };

    return (
        <StyledAppBar position="sticky" className="menubar_container">
            <Toolbar className="menubar_toolbar">
                <img src={logo} alt="Logo" className="menuBar_img" />
                <MenuLink onClick={() => scrollToSection("info")}>Info</MenuLink>
                <MenuLink onClick={() => scrollToSection("priser")}>Priser</MenuLink>
                <MenuLink onClick={() => scrollToSection("kontakt")}>Kontakt</MenuLink>
                <StyledButton variant="contained" color="primary" onClick={handleBookClick}>
                    Boka nu
                </StyledButton>
            </Toolbar>
        </StyledAppBar>
    );
}

export default MenuBar;

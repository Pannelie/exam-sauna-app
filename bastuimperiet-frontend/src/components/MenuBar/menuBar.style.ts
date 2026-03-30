import { AppBar, IconButton, Toolbar, styled } from "@mui/material";
import bg from "../../assets/wood2.webp";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: "sticky",
    top: 0,
    backgroundImage: `url(${bg})`,
    color: theme.palette.common.white,
    boxShadow: "none",
    padding: "1rem 0",
}));

export const StyledToolbar = styled(Toolbar)(() => ({
    justifyContent: "space-evenly",
    minHeight: "var(--menubar-height)",
    padding: "0 1rem",
}));

export const MenuLink = styled("a")(({ theme }) => ({
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 5),
    borderRadius: theme.shape.borderRadius,
    fontSize: "1.4rem",
    fontWeight: 700,
    fontFamily: theme.typography.h3.fontFamily,
    textTransform: "uppercase",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        transform: "scale(1.03)",
    },
    [theme.breakpoints.down("md")]: { fontSize: "0.95rem" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));

export const StyledMenuButton = styled(IconButton)(({ theme }) => ({
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

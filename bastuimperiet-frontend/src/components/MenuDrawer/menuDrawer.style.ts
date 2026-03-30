import { Drawer, Box, List, styled, ListItemText } from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
}));

export const StyledBox = styled(Box)(() => ({
    width: 250,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "4rem",
}));

export const MenuList = styled(List)(() => ({
    flexGrow: 1,
}));

export const ItemText = styled(ListItemText)(({ theme }) => ({
    "& .MuiTypography-root": {
        fontSize: "1.4rem",
        lineHeight: 1.2,
        fontFamily: theme.typography.h3.fontFamily,
        textTransform: "uppercase",
    },
}));

export const BottomActionArea = styled(Box)(({ theme }) => ({
    marginTop: "auto",
    padding: theme.spacing(1.5),
}));

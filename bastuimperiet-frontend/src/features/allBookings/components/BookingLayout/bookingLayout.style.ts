import { Box, styled } from "@mui/material";

// Huvudbehållaren för hela layouten
export const LayoutWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    height: "100vh",
    width: "75%",
    margin: "2rem auto",
    gap: theme.spacing(3),
}));

export const SidebarContainer = styled(Box)(({}) => ({
    flex: 2,
    display: "flex",
    flexDirection: "column",
}));

export const MainContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));

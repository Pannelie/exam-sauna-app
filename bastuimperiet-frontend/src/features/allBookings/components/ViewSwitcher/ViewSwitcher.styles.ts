import { Box, styled, Tab, Tabs, IconButton } from "@mui/material";

const mobileButtonOptions = {
    shouldForwardProp: (prop: string) => prop !== "$active",
};

export const StyledSwitchContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "1rem 0",
    zIndex: 10,
});

export const MobileSearchToggle = styled(
    IconButton,
    mobileButtonOptions,
)<{ $active: boolean }>(({ theme, $active }) => ({
    position: "absolute",
    left: "max(12px, calc(50% - 100px))",
    width: 34,
    height: 34,

    backgroundColor: $active ? "rgba(255, 255, 255, 0.88)" : "rgba(0, 0, 0, 0.35)",
    color: $active ? theme.palette.text.primary : theme.palette.common.white,
    backdropFilter: "blur(4px)",
    "&:hover": {
        backgroundColor: $active ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.45)",
    },
}));

export const StyledTabs = styled(Tabs)({
    minHeight: "40px",
    height: "40px",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(4px)",
    borderRadius: "20px",
    padding: "4px",
    boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.2)",

    "& .MuiTabs-flexContainer": {
        gap: "4px",
    },

    "& .MuiTabs-indicator": {
        height: "100%",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
        zIndex: 0,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important",
    },
});

export const StyledTab = styled(Tab)({
    minHeight: "32px",
    height: "32px",
    minWidth: "50px !important",
    padding: "0 16px",
    borderRadius: "16px",
    zIndex: 1,
    color: "rgba(255, 255, 255, 0.7)",
    transition: "all 0.2s ease",
    "& .MuiSvgIcon-root": {
        fontSize: "1.3rem",
        transition: "color 0.2s ease",
    },
    // Hover-effekt
    "&:hover": {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&.Mui-selected": {
        color: "#2D1410",
        "& .MuiSvgIcon-root": {
            color: "#2D1410",
        },
    },
});

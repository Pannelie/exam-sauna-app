import { Box, styled, Tab, Tabs } from "@mui/material";

export const StyledSwitchContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    my: 1,
    position: "absolute",
    top: "2rem",
    left: 0,
    right: 0,
    zIndex: 10,
});

export const StyledTabs = styled(Tabs)({
    minHeight: "36px", // Mycket lägre än standard (48px)
    height: "36px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "18px",
    padding: "2px",
    "& .MuiTabs-indicator": {
        height: "100%",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        zIndex: 0,
    },
});

export const StyledTab = styled(Tab)({
    minHeight: "32px",
    height: "32px",
    minWidth: "60px",
    padding: "4px 12px",
    borderRadius: "16px",
    zIndex: 1,
    transition: "color 0.2s",
    "&.Mui-selected": {
        color: "#000",
    },
    "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
    },
});

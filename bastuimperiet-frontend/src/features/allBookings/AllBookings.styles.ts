import { Box, Paper, styled, TextField, Select } from "@mui/material";
import type { PillProps, MainContainerProps, ListWrapperProps, DetailViewBoxProps } from "./types/types";

const transientProps = ["$isMobile", "$hasId", "active"];

const styledOptions = {
    shouldForwardProp: (prop: string) => !transientProps.includes(prop),
};

export const MainContainer = styled(
    Box,
    styledOptions,
)<MainContainerProps>(({ theme, $isMobile }) => ({
    flex: 1,
    display: "flex",
    flexDirection: $isMobile ? "column" : "row",
    gap: $isMobile ? theme.spacing(2) : theme.spacing(4),
    overflow: "hidden",
}));

export const ListWrapper = styled(
    Box,
    styledOptions,
)<ListWrapperProps>(({ theme, $isMobile }) => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: $isMobile ? "none" : "400px",
    gap: theme.spacing(2),
    width: "100%",
    minHeight: 0,
    height: "100%",
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
    },
});

export const StyledSelect = styled(Select)({
    backgroundColor: "white",
    borderRadius: "8px",
    fontWeight: "bold",
});

export const ScrollableList = styled(Box)({
    flex: 1,
    overflowY: "auto",
    paddingRight: "8px",
    "&::-webkit-scrollbar": { display: "none" },
});

export const DetailViewBox = styled(
    Box,
    styledOptions,
)<DetailViewBoxProps>(({ $hasId }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: $hasId ? "flex-start" : "center",
    alignItems: $hasId ? "stretch" : "center",
    padding: "32px", // 4 * 8px
    height: "100%",
    overflowY: "auto",
}));

// Befintliga komponenter
export const CategoryScrollContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "8px",
    zIndex: 100,
    overflowX: "auto",
    flexWrap: "nowrap",
    [theme.breakpoints.up("md")]: {
        flexWrap: "wrap",
        overflowX: "visible",
    },
    padding: "4px 0 12px 0",
    "&::-webkit-scrollbar": { display: "none" },
}));

export const Pill = styled(
    "div",
    styledOptions,
)<PillProps>(({ active }) => ({
    padding: "8px 22px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    backgroundColor: active ? "white" : "rgba(0, 0, 0, 0.4)",
    color: active ? "black" : "white",
    backdropFilter: "blur(4px)",
    border: `1px solid ${active ? "white" : "rgba(255, 255, 255, 0.2)"}`,
    "&:active": { transform: "scale(0.95)" },
}));

export const ContentPaper = styled(Paper)({
    backgroundColor: "white",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    height: "100%",
    minWidth: 0,
});

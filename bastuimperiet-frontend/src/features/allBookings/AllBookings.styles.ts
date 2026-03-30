import { Box, Paper, styled, TextField, Select } from "@mui/material";
import type { MainContainerProps, ListWrapperProps, DetailViewBoxProps } from "./types/types";

const transientProps = ["$isMobile", "$hasId", "$active"];

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
    gap: $isMobile ? theme.spacing(2) : theme.spacing(2), // Något mindre gap för att få plats
    overflow: "hidden",
    height: "100vh", // Säkerställ att containern tar hela höjden
    padding: theme.spacing(2),
}));

export const MobileTopPanel = styled(Box)(({ theme }) => ({
    position: "sticky",
    top: 0,
    zIndex: 35,

    [theme.breakpoints.up("md")]: {
        display: "none",
    },
}));

export const ListWrapper = styled(
    Box,
    styledOptions,
)<ListWrapperProps>(({ theme, $isMobile }) => ({
    display: "flex",
    flexDirection: "column",
    // Fixerad bredd på desktop, flexibel på mobil
    flex: $isMobile ? 1 : "0 0 350px",
    maxWidth: $isMobile ? "none" : "350px",
    minWidth: $isMobile ? "none" : "300px",
    gap: theme.spacing(2),
    height: "100%",
    overflow: "hidden",
}));

export const CalendarWrapper = styled(Box)({
    flex: 1, // Denna gör att kalendern "äter" allt utrymme mellan listan och detaljvyn
    minWidth: 0, // Viktigt för att flex-barn inte ska overflowa
    overflowY: "auto",
    "& .fc": {
        height: "100% !important", // Tvingar FullCalendar att fylla containern
    },
});

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
    touchAction: "pan-y",
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
    padding: "2rem", // 4 * 8px
    gap: "1rem",
    height: "100%",
    overflowY: "auto",
}));

export const MobileDetailViewBox = styled(Box)(({}) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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

export const ContentPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    height: "100%",
    // Fixerad bredd så att detaljvyn inte hoppar i storlek
    flex: "0 0 400px",
    minWidth: 0,
}));

export const DefaultBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "3rem",
    gap: "2rem",
});

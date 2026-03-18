import { Box, Paper, styled } from "@mui/material";

// 1. Fixa TS-felet genom att definiera props för Pill
interface PillProps {
    active?: boolean;
}

export const SidebarWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden", // Hindrar hela sidbaren från att skrolla, bara listan inuti ska göra det
});

// 2. Optimera StyledBox för att vara en vertikal lista på desktop
export const CategoryScrollContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "8px",
    // Mobil: Skrolla horisontellt
    overflowX: "auto",
    flexWrap: "nowrap",

    // Desktop: Radbryt istället för att skrolla
    [theme.breakpoints.up("md")]: {
        flexWrap: "wrap",
        overflowX: "visible",
    },

    padding: "4px 0 12px 0",
    "&::-webkit-scrollbar": { display: "none" },
}));

export const Pill = styled("div")<PillProps>(({ active }) => ({
    padding: "8px 22px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    // Mer kontrast mot träet:
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
    height: "100%", // Viktigt!
    // Förhindra att innehållet "pressar ut" boxen:
    minWidth: 0,
});

export const CalendarPlaceholder = styled(Box)({
    flex: 1,
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0, // Tillåter containern att krympa om det behövs
});

// Gamla komponenter som vi behåller för säkerhets skull/mobilvy
export const ListContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: theme.spacing(2),
    overflowY: "auto",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
}));

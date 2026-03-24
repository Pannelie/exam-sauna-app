import { Box, Select, styled, TextField } from "@mui/material";
import type { PillProps } from "../../types/types";

const styledOptions = {
    shouldForwardProp: (prop: string) => !["active"].includes(prop),
};

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

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
    scrollSnapType: "x mandatory",
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    padding: "4px 12px 12px 12px",
    scrollPaddingInline: "12px",
    [theme.breakpoints.up("md")]: {
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        flexWrap: "wrap",
        overflowX: "visible",
        padding: "4px 0 12px 0",
    },
    "&::-webkit-scrollbar": { display: "none" },
}));

export const Pill = styled(
    "div",
    styledOptions,
)<PillProps>(({ active }) => ({
    padding: "8px 20px",
    minHeight: "38px",
    display: "inline-flex",
    alignItems: "center",
    scrollSnapAlign: "start",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontWeight: "800",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    textTransform: "lowercase",
    letterSpacing: "0.7px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: active ? "#ffffff" : "rgba(0, 0, 0, 0.35)",
    color: active ? "#1a1a1a" : "rgba(255, 255, 255, 0.9)",
    backdropFilter: active ? "none" : "blur(8px)",
    boxShadow: active ? "0px 4px 12px rgba(0, 0, 0, 0.2)" : "none",
    "&:active": {
        transform: "scale(0.96)",
    },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

export const MobileFilterStack = styled(Box)(({}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: ".5rem",
}));

export const MobileSearchRow = styled(Box)(({ theme }) => ({
    paddingInline: theme.spacing(1.5),
}));

export const StyledTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
    },
});

export const MobileStyledTextField = styled(TextField)({
    backgroundColor: "rgba(255, 255, 255, 0.84)",
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        "&.Mui-focused fieldset": {
            borderColor: "rgba(255, 255, 255, 0.84)",
        },
    },
});

export const StyledSelect = styled(Select)({
    backgroundColor: "white",
    borderRadius: "8px",
    fontWeight: "bold",
});

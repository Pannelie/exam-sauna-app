import { Box, Paper, Tab, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))",
    gap: "1.5rem",
    padding: theme.spacing(1),
}));

export const ListContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "0 20px 20px 20px",
    padding: theme.spacing(2),
    overflowY: "auto",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
}));

export const SidebarWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
});

export const CalendarPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

export const DetailsPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    minHeight: "200px",
}));

export const CalendarPlaceholder = styled(Box)({
    height: "300px",
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

// Här stylar vi om MuiTab via styled istället för sx
export const StyledTab = styled(Tab)(({}) => ({
    color: "rgba(255,255,255,0.7)",
    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(5px)",
    borderRadius: "12px 12px 0 0",
    marginRight: "5px",
    transition: "all 0.2s",
    "&.Mui-selected": {
        color: "#333",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
}));

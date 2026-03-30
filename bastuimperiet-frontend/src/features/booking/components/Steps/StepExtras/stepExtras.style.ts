import { Box, Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)({
    padding: "1rem",
});

export const DesktopPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
}));

export const MobileListContainer = styled(Box)(() => ({
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px",
    border: "1px solid rgba(0,0,0,0.05)",
    overflow: "hidden",
}));

export const ListRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    minHeight: "64px",
    [theme.breakpoints.down("md")]: {
        padding: "12px 16px",
        minHeight: "64px",
    },
    [theme.breakpoints.up("md")]: {
        padding: "8px 12px",
        minHeight: "52px",
    },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    [theme.breakpoints.up("md")]: {
        width: "36px",
        height: "36px",
    },
}));

export const DesktopExtrasGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.spacing(1),
}));

export const DesktopExtraCard = styled(Box)(({ theme }) => ({
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "74px",
}));

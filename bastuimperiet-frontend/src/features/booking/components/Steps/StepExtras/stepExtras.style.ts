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

export const ListRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    minHeight: "64px",
});

export const IconWrapper = styled(Box)(() => ({
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginRight: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
}));

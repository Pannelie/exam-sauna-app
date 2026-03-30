import { Box, styled } from "@mui/material";

export const StyledBookingLayout = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(4),
    padding: theme.spacing(4),
    minHeight: "500px",
    margin: "auto",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: 0,
    },
}));

export const ColumnWrapper = styled(Box)({
    flex: 1,
    minWidth: 0,
});

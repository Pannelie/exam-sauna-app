import { Box, styled } from "@mui/material";

export const StyledBookingLayout = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(3),

    maxWidth: "1200px", // 🔥 begränsa bredd
    margin: "0 auto", // 🔥 centrera

    width: "100%",
    padding: theme.spacing(2),
    overflow: "hidden",
    marginBottom: theme.spacing(4),
}));

export const ColumnWrapper = styled(Box)({
    flex: 1,
    minWidth: 0,
});

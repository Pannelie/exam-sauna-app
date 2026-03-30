import { Box, styled } from "@mui/material";

export const UserWrapper = styled(Box)({
    position: "relative",
    display: "inline-block",
    "&:hover .dropdown-card": {
        display: "flex",
    },
});

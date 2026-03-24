import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export type BookNowButtonStyleVariant = "default" | "heroDesktop" | "heroMobile";

export const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "styleVariant",
})<{ styleVariant: BookNowButtonStyleVariant }>(({ theme, styleVariant }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "fit-content",
    padding: theme.spacing(1, 6),
    fontSize: "2rem",
    textTransform: "none",
    flexShrink: 0,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ...(styleVariant === "heroMobile" && {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        borderRadius: 0,
        fontSize: "1.4rem",
    }),
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        transform: "scale(1.03)",
    },
}));

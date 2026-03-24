import { Button, styled } from "@mui/material";

interface MobileProp {
    isMobile?: boolean;
}

export const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "isMobile",
})<MobileProp>(({ theme, variant, isMobile }) => ({
    backgroundColor: variant === "contained" ? theme.palette.primary.main : "transparent",
    color: variant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
    border: variant === "outlined" ? `1px solid ${theme.palette.primary.main}` : undefined,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    maxWidth: isMobile ? "100%" : "50%",
    paddingTop: isMobile ? theme.spacing(1) : undefined,
    paddingBottom: isMobile ? theme.spacing(1) : undefined,
    fontSize: isMobile ? 15 : undefined,
    alignSelf: "flex-end",
    width: isMobile ? "fit-content" : "50%",
    borderRadius: isMobile ? "12px" : undefined,
}));

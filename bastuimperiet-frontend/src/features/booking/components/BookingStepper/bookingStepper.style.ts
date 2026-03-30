import { Box, Stepper, styled } from "@mui/material";

// Typ för att tillåta isMobile-prop
interface MobileProp {
    isMobile?: boolean;
}

export const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isMobile",
})<MobileProp>(({ theme, isMobile }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.9)",
    borderRadius: isMobile ? "12px" : "24px",
    padding: isMobile ? theme.spacing(1.5) : theme.spacing(3),
    height: "100%",
    width: "100%",
    minWidth: isMobile ? undefined : 0,
}));

export const StyledStepper = styled(Stepper, {
    shouldForwardProp: (prop) => prop !== "isMobile",
})<MobileProp>(({ theme, isMobile }) => ({
    marginBottom: isMobile ? theme.spacing(2) : theme.spacing(4),
    padding: isMobile ? 0 : undefined,
}));

export const StyledFormContent = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
});

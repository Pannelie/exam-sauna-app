import { Typography, Box, Stack, Paper, styled } from "@mui/material";

export const HeaderContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
});

export const CustomerIdLabel = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
}));

export const DynamicName = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "textLength",
})<{ textLength: number; isLastName?: boolean }>(({ textLength, isLastName, theme }) => {
    let fontSize = "1.5rem";
    if (textLength > 15) fontSize = "1.1rem";
    else if (textLength > 10) fontSize = "1.3rem";

    return {
        fontWeight: "bold",
        fontSize,
        lineHeight: 1.1,
        wordBreak: "break-all",
        color: theme.palette.text.primary,
        opacity: isLastName ? 0.9 : 1,
    };
});
export const ContactValue = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.primary,
}));

export const ChipsContainer = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
});

export const IntegrationPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
}));

export const IntegrationError = styled(Typography)({
    marginTop: "8px",
    display: "block",
});

export const ActionFooter = styled(Stack)({
    justifyContent: "center",
    marginTop: "auto",
});

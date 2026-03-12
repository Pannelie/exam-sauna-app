import { Box, Stack, styled } from "@mui/material";
import type { ReactNode } from "react";

interface StyledStepContainerProps {
    children: ReactNode;
    actions: ReactNode;
}

const StyledBox = styled(Box)({
    display: "grid",
    gridTemplateRows: "1fr auto",
    height: "100%",
    gap: 16,
    width: "100%",
});

export const StyledStepContainer = ({ children, actions }: StyledStepContainerProps) => {
    return (
        <StyledBox>
            <Stack spacing={2}>{children}</Stack>

            <Stack direction="row" spacing={2} justifyContent="space-between">
                {actions}
            </Stack>
        </StyledBox>
    );
};

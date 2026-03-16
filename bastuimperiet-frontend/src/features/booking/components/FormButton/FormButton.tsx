import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme, variant }) => ({
    backgroundColor: variant === "contained" ? theme.palette.primary.main : "transparent",
    color: variant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
    border: variant === "outlined" ? `1px solid ${theme.palette.primary.main}` : undefined,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
}));

interface FormButtonProps {
    variant?: "text" | "outlined" | "contained";
    onClick: () => void;
    text: string;
    disabled?: boolean;
}

export const FormButton = ({ variant = "text", onClick, text, disabled }: FormButtonProps) => {
    return (
        <StyledButton variant={variant} onClick={onClick} disabled={disabled}>
            {text}
        </StyledButton>
    );
};

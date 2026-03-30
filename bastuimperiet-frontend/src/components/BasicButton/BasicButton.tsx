import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface BasicButtonProps {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: ReactNode;
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    title?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
    sx?: any;
}

export const BasicButton = ({
    onClick,
    children,
    color = "primary",
    variant = "contained",
    disabled = false,
    title,
    label,
    type = "button",
    sx,
}: BasicButtonProps) => {
    return (
        <Button onClick={onClick} color={color} variant={variant} disabled={disabled} title={title} type={type} sx={sx}>
            {label ? label : children}
        </Button>
    );
};

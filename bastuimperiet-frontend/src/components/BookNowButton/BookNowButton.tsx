import { Button, styled } from "@mui/material";

type BookNowButtonStyleVariant = "default" | "heroDesktop" | "heroMobile";

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "styleVariant",
})<{ styleVariant: BookNowButtonStyleVariant }>(({ theme, styleVariant }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "auto",
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

type BookNowButtonProps = {
    onClick: () => void;
    className?: string;
    styleVariant?: BookNowButtonStyleVariant;
};

export const BookNowButton = ({ onClick, className, styleVariant = "default" }: BookNowButtonProps) => {
    return (
        <StyledButton variant="contained" color="primary" onClick={onClick} className={className} styleVariant={styleVariant}>
            Boka nu
        </StyledButton>
    );
};

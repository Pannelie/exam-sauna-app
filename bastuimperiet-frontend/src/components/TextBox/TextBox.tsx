import "./textbox.css";
import { Typography, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    minWidth: "300px",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
    padding: "1rem",
}));

const StyledTypography = styled(Typography)(() => ({
    padding: "0rem 2rem",
}));

type TextBoxProps = {
    title?: string;
    text?: string;
};
export const TextBox = ({ title, text }: TextBoxProps) => {
    if (!title && !text) {
        return null;
    }

    return (
        <StyledPaper>
            {title ? <StyledTypography variant="h4">{title}</StyledTypography> : <StyledTypography>{text}</StyledTypography>}
        </StyledPaper>
    );
};

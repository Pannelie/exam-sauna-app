import { Typography, styled } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
}));
type MenuTitleProps = {
    title: string;
};
export const MenuTitle = ({ title }: MenuTitleProps) => {
    return <StyledTypography variant="h3">{title}</StyledTypography>;
};

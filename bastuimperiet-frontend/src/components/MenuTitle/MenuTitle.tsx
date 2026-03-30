import * as S from "./menuTitle.style";

type MenuTitleProps = {
    title: string;
};
export const MenuTitle = ({ title }: MenuTitleProps) => {
    return <S.StyledTypography variant="h3">{title}</S.StyledTypography>;
};

import * as S from "./bookNowButton.style";

type BookNowButtonProps = {
    onClick: () => void;
    styleVariant?: S.BookNowButtonStyleVariant;
};

export const BookNowButton = ({ onClick, styleVariant = "default" }: BookNowButtonProps) => {
    return (
        <S.StyledButton variant="contained" color="primary" onClick={onClick} styleVariant={styleVariant}>
            Boka nu
        </S.StyledButton>
    );
};

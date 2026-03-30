import * as S from "./bookingLayout.style";

interface Props {
    sidebar: React.ReactNode;
    mainContent: React.ReactNode;
}

export const BookingLayout = ({ sidebar, mainContent }: Props) => {
    return (
        <S.LayoutWrapper>
            <S.SidebarContainer>{sidebar}</S.SidebarContainer>

            <S.MainContentContainer>{mainContent}</S.MainContentContainer>
        </S.LayoutWrapper>
    );
};

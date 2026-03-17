import { Box, styled } from "@mui/material";

// Huvudbehållaren för hela layouten
const LayoutWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    height: "100vh",
    width: "75%",
    margin: "2rem auto",
    gap: theme.spacing(3),
}));

const SidebarContainer = styled(Box)(({}) => ({
    flex: 2,
    display: "flex",
    flexDirection: "column",
}));

const MainContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));

interface Props {
    sidebar: React.ReactNode;
    mainContent: React.ReactNode;
}

export const BookingLayout = ({ sidebar, mainContent }: Props) => {
    return (
        <LayoutWrapper>
            <SidebarContainer>{sidebar}</SidebarContainer>

            <MainContentContainer>{mainContent}</MainContentContainer>
        </LayoutWrapper>
    );
};

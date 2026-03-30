import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./ViewSwitcher.styles";

interface ViewSwitcherProps {
    value: number;
    onChange: (newValue: number) => void;
    showSearchToggle?: boolean;
    isSearchActive?: boolean;
    onSearchToggle?: () => void;
}

export const ViewSwitcher = ({ value, onChange, showSearchToggle = false, isSearchActive = false, onSearchToggle }: ViewSwitcherProps) => {
    return (
        <S.StyledSwitchContainer>
            {showSearchToggle && (
                <S.MobileSearchToggle
                    aria-label={isSearchActive ? "Stäng sök" : "Öppna sök"}
                    onClick={onSearchToggle}
                    $active={isSearchActive}
                >
                    {isSearchActive ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                </S.MobileSearchToggle>
            )}
            <S.StyledTabs value={value} onChange={(_, v) => onChange(v)}>
                <S.StyledTab icon={<ListIcon />} value={0} disableRipple />
                <S.StyledTab icon={<CalendarMonthIcon />} value={1} disableRipple />
            </S.StyledTabs>
        </S.StyledSwitchContainer>
    );
};

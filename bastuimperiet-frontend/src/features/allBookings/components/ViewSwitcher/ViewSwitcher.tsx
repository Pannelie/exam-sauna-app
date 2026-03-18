import ListIcon from "@mui/icons-material/List";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as S from "./ViewSwitcher.styles";

interface ViewSwitcherProps {
    value: number;
    onChange: (newValue: number) => void;
}

export const ViewSwitcher = ({ value, onChange }: ViewSwitcherProps) => {
    return (
        <S.StyledSwitchContainer>
            <S.StyledTabs value={value} onChange={(_, v) => onChange(v)}>
                <S.StyledTab icon={<ListIcon />} value={0} disableRipple />
                <S.StyledTab icon={<CalendarMonthIcon />} value={1} disableRipple />
            </S.StyledTabs>
        </S.StyledSwitchContainer>
    );
};

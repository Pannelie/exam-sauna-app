import { FormControl, MenuItem, InputAdornment, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as S from "./bookingFilters.styles";

interface BookingFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    tabIndex: number;
    setTabIndex: (index: number) => void;
    categories: string[];
    isMobile: boolean;
    isMobileSearchOpen?: boolean;
}

export const BookingFilters = ({
    searchTerm,
    setSearchTerm,
    tabIndex,
    setTabIndex,
    categories,
    isMobile,
    isMobileSearchOpen = false,
}: BookingFiltersProps) => {
    if (isMobile) {
        const showSearchInput = isMobileSearchOpen || searchTerm.length > 0;

        return (
            <S.MobileFilterStack>
                <Collapse in={showSearchInput} timeout={180} unmountOnExit>
                    <S.MobileSearchRow>
                        <S.MobileStyledTextField
                            placeholder="Sök namn eller id..."
                            size="small"
                            fullWidth
                            autoFocus={isMobileSearchOpen}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </S.MobileSearchRow>
                </Collapse>

                <S.CategoryScrollContainer>
                    {categories.map((c, i) => (
                        <S.Pill key={c} active={tabIndex === i} onClick={() => setTabIndex(i)}>
                            {c}
                        </S.Pill>
                    ))}
                </S.CategoryScrollContainer>
            </S.MobileFilterStack>
        );
    }

    return (
        <S.SearchContainer>
            <S.StyledTextField
                placeholder="Sök namn eller id..."
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />
            <FormControl fullWidth size="small">
                <S.StyledSelect value={tabIndex} onChange={(e) => setTabIndex(Number(e.target.value))}>
                    {categories.map((c, i) => (
                        <MenuItem key={c} value={i}>
                            {c}
                        </MenuItem>
                    ))}
                </S.StyledSelect>
            </FormControl>
        </S.SearchContainer>
    );
};

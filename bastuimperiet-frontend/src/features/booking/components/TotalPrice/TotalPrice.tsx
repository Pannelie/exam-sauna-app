import { Stack, Typography, styled } from "@mui/material";
import { useBookingFormStore } from "../../../../stores/useBookingFormStore";

const StyledTypography = styled(Typography)({
    fontWeight: "bold",
});

export const TotalPrice = () => {
    const { totalPrice } = useBookingFormStore();

    return (
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end">
            <StyledTypography variant="caption" color="text.secondary">
                ATT BETALA
            </StyledTypography>
            <Typography variant="h4">{totalPrice} kr</Typography>
        </Stack>
    );
};

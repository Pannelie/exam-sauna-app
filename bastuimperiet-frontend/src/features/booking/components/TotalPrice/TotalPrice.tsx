import { Stack, Typography, Paper, styled } from "@mui/material";
import { useBookingFormStore } from "../../../../stores/useBookingFormStore";

const StyledPaper = styled(Paper)({
    padding: "1rem",
    marginTop: "auto",
});

export const TotalPrice = () => {
    const { totalPrice } = useBookingFormStore();

    return (
        <StyledPaper>
            <Stack direction="row" justifyContent="space-between">
                <Typography>Totalt</Typography>
                <Typography>{totalPrice} kr</Typography>
            </Stack>
        </StyledPaper>
    );
};

import { Stack, Typography, Paper, styled } from "@mui/material";
import { useBookingStore } from "../../stores/useBookingStore";

const StyledPaper = styled(Paper)({
    padding: "1rem",
    marginTop: "auto",
});

export const TotalPrice = () => {
    const { totalPrice } = useBookingStore();

    return (
        <StyledPaper>
            <Stack direction="row" justifyContent="space-between">
                <Typography>Totalt</Typography>
                <Typography>{totalPrice} kr</Typography>
            </Stack>
        </StyledPaper>
    );
};

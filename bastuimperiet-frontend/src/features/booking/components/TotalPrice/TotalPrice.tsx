import { Stack, Typography } from "@mui/material";
import { useBookingFormStore } from "../../../../stores/useBookingFormStore";

export const TotalPrice = () => {
    const { totalPrice } = useBookingFormStore();

    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}>
            <Typography variant="caption" color="text.secondary">
                ATT BETALA
            </Typography>
            <Typography fontSize="1rem" fontWeight="bold">
                {totalPrice} kr
            </Typography>
        </Stack>
    );
};

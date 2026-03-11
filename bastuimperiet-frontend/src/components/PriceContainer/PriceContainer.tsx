import { Paper, Typography } from "@mui/material";

interface PriceContainerProps {
    day: string;
    price: string;
    text: string;
}

export const PriceContainer = ({ day, price, text }: PriceContainerProps) => {
    return (
        <Paper elevation={1} style={{ padding: "2rem", marginBottom: "2rem" }}>
            <Typography variant="h4">{day}</Typography>
            <Typography variant="h4">{price}</Typography>
            <Typography variant="body1">{text}</Typography>
        </Paper>
    );
};

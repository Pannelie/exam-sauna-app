import { Paper, Typography, styled } from "@mui/material";

type PriceContainerProps = {
    day?: string;
    extra?: string;
    info?: boolean;
    price?: number | null;
    text: string;
    fallback?: boolean;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: "100%",
}));

const InfoPaper = styled(StyledPaper)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const InfoText = styled(Typography)(() => ({
    textAlign: "center",
}));

export const PriceContainer = ({ day, extra, info, price, text, fallback }: PriceContainerProps) => {
    const isInfo = Boolean(info);
    const title = day || extra || "";
    const displayPrice = isInfo ? "" : price !== null && price !== undefined ? price : "";
    const Container = isInfo ? InfoPaper : StyledPaper;

    return (
        <Container elevation={1}>
            {isInfo ? (
                <InfoText>Kontakta oss för längre bokningar</InfoText>
            ) : (
                <>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h4">{displayPrice}kr</Typography>
                    <Typography variant="body1">{text}</Typography>
                    {fallback && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", marginTop: 0.5 }}>
                            Standardpris
                        </Typography>
                    )}
                </>
            )}
        </Container>
    );
};

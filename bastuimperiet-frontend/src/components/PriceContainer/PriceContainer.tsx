import { Paper, Typography, styled } from "@mui/material";

type PriceContainerProps = {
    day?: string;
    extra?: string;
    info?: boolean;
    price?: string;
    text: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: "100%",
}));

const InfoPaper = styled(StyledPaper)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const InfoText = styled(Typography)(() => ({
    textAlign: "center",
}));

export const PriceContainer = ({ day, extra, info, price, text }: PriceContainerProps) => {
    const isInfo = Boolean(info);
    const title = day || extra || "";
    const displayPrice = isInfo ? "" : price || "";
    const Container = isInfo ? InfoPaper : StyledPaper;

    return (
        <Container elevation={1}>
            {isInfo ? (
                <InfoText>Kontakta oss för längre bokningar</InfoText>
            ) : (
                <>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h4">{displayPrice}</Typography>
                    <Typography variant="body1">{text}</Typography>
                </>
            )}
        </Container>
    );
};

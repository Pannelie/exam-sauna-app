import { Paper, styled, Box, Stack, Skeleton } from "@mui/material";

// Huvudbehållaren som matchar din BookingCard
const SkeletonPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "160px",
    height: "auto",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    borderTop: "8px solid #e0e0e0", // Neutral grå för laddning
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
}));

// Wrapper för mittensektionen för att centrera skeleton-texten
const CenterContent = styled(Box)({
    textAlign: "center",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
});

// Wrapper för bottensektionen
const BottomSection = styled(Box)({
    marginTop: "16px",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
});

// Styled Skeleton för ID-texten
const IdSkeleton = styled(Skeleton)({
    width: "60%",
    height: "32px",
    marginBottom: "8px",
    borderRadius: "4px",
});

// Styled Skeleton för Datum-texten
const DateSkeleton = styled(Skeleton)({
    width: "80%",
    height: "20px",
    borderRadius: "4px",
});

// Styled Skeleton för status-strecket i toppen
const TopBarSkeleton = styled(Skeleton)({
    width: "40px",
    height: "4px",
    borderRadius: "2px",
    marginBottom: "8px",
});

export const BookingCardSkeleton = () => {
    return (
        <SkeletonPaper elevation={0}>
            {/* TOPP */}
            <TopBarSkeleton variant="rectangular" animation="wave" />

            {/* MITTEN */}
            <CenterContent>
                <IdSkeleton variant="text" animation="wave" />
                <DateSkeleton variant="text" animation="wave" />
            </CenterContent>

            {/* BOTTEN */}
            <BottomSection>
                <Stack direction="row" spacing={2}>
                    <Skeleton variant="circular" width={35} height={35} animation="wave" />
                    <Skeleton variant="circular" width={35} height={35} animation="wave" />
                </Stack>
            </BottomSection>
        </SkeletonPaper>
    );
};

import { Box, Paper, Typography, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "3rem",
    width: "100%",
    padding: "6rem 2rem",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    flex: 1,
    width: "100%",
    padding: "3rem",
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "1.5rem",
    [theme.breakpoints.down("md")]: {
        padding: "1.5rem",
        gap: ".5rem",
    },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
        fontSize: "1.1rem",
    },
}));

export const StyledTypographyStaff = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
    },
}));

export const ContactImage = styled("img")(({ theme }) => ({
    width: 320,
    maxWidth: "100%",
    height: "auto",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginBottom: "1.5rem",
    },
}));

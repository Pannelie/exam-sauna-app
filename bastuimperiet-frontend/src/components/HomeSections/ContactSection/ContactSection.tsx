import "./contactSection.css";
import { Paper, Typography, styled } from "@mui/material";
import { HomeSection } from "../HomeSection/HomeSection";
import image from "../../../assets/OutsideParking.jpg";
import PhoneIcon from "@mui/icons-material/Phone";

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.7rem",
    padding: "1.2rem",
    backgroundColor: "white",
    borderRadius: "8px",
    color: theme.palette.text.secondary,
    margin: "auto",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    [theme.breakpoints.down("sm")]: {
        padding: "0.7rem",
        maxWidth: "100%",
    },
}));

const StyledTypography = styled(Typography)({
    fontSize: "1.5rem",
    textAlign: "center",
});

const StyledTypographyStaff = styled(Typography)({
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
});

const ContactImage = styled("img")(({ theme }) => ({
    width: 320,
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "1.2rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "0.7rem",
    },
}));

const ContactSectionWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "1rem",
    },
}));

export function ContactSection() {
    return (
        <HomeSection id="kontakt">
            <ContactSectionWrapper>
                <ContactImage src={image} alt="Outside Parking" />
                <StyledPaper>
                    <StyledTypography variant="h4">Undrar du något mer?</StyledTypography>
                    <StyledTypographyStaff variant="body2">
                        <PhoneIcon /> 070-123 455
                    </StyledTypographyStaff>
                    <StyledTypographyStaff variant="body2">
                        <PhoneIcon /> 070-123 455
                    </StyledTypographyStaff>
                    <StyledTypography variant="body2">bastuimperiet@gmail.com</StyledTypography>
                </StyledPaper>
            </ContactSectionWrapper>
        </HomeSection>
    );
}

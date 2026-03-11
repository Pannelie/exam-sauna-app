import "./contactSection.css";
import { Paper, Typography, styled } from "@mui/material";
import { MenuTitle } from "../../MenuTitle";
import { HomeSection } from "../HomeSection/HomeSection";
import image from "../../../assets/OutsideParking.jpg";

const StyledPaper = styled(Paper)({
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
});

const StyledTypography = styled(Typography)({
    gridColumn: "span 2",
});

export function ContactSection() {
    return (
        <HomeSection id="kontakt">
            <MenuTitle title="Kontakt" />
            <div className="contact_section">
                <img src={image} alt="Outside Parking" className="contact_image" />
                <StyledPaper>
                    <StyledTypography>Undrar du något mer?</StyledTypography>
                    <div className="contact_staff-details">
                        <Typography>Jacob</Typography>
                        <Typography>070-123 455</Typography>
                    </div>
                    <div className="contact_staff-details">
                        <Typography>Johannes</Typography>
                        <Typography>070-123 455</Typography>
                    </div>
                    <StyledTypography>bastuimperiet@gmail.com</StyledTypography>
                </StyledPaper>
            </div>
        </HomeSection>
    );
}

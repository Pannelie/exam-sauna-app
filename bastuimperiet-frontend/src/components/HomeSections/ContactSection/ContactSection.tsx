import React from "react";
import { HomeSection } from "../HomeSection/HomeSection";
import image from "../../../assets/OutsideParking.webp";
import PhoneIcon from "@mui/icons-material/Phone";
import * as S from "./contactSection.style";

// Återanvänd layout från InfoSection

export const ContactSection = React.forwardRef<HTMLElement>((__, ref) => {
    return (
        <HomeSection id="kontakt" ref={ref}>
            <S.StyledBox>
                <S.ContactImage src={image} alt="Outside Parking" />
                <S.StyledPaper elevation={6}>
                    <S.StyledTypography variant="h4">Undrar du något mer?</S.StyledTypography>
                    <S.StyledTypographyStaff variant="body2">
                        <PhoneIcon /> 070-123 455
                    </S.StyledTypographyStaff>
                    <S.StyledTypographyStaff variant="body2">
                        <PhoneIcon /> 070-123 455
                    </S.StyledTypographyStaff>
                    <S.StyledTypography variant="body2">bastuimperiet@gmail.com</S.StyledTypography>
                </S.StyledPaper>
            </S.StyledBox>
        </HomeSection>
    );
});

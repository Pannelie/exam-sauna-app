import { Typography } from "@mui/material";
import { Carousel } from "../../Carousel/Carousel";
import { HomeSection } from "../HomeSection/HomeSection";
import * as S from "./infoSection.style";
import React from "react";

export const InfoSection = React.forwardRef<HTMLElement>((__, ref) => {
    return (
        <HomeSection id="info" ref={ref}>
            <S.StyledBox>
                {/* Carousel */}
                <Carousel />

                {/* Info Paper */}
                <S.StyledPaper elevation={6}>
                    <S.StyledTypography variant="h3" gutterBottom>
                        Välkommen till Bastuimperiet!
                    </S.StyledTypography>
                    <Typography variant="body2">
                        Här kan du hyra en vedeldad bastu på släp och njuta av en härlig bastuupplevelse ute i naturen. Med vår bastu tar du
                        dig enkelt till dina favoritplatser vid sjön, stugan eller vart du vill.
                    </Typography>
                </S.StyledPaper>
            </S.StyledBox>
        </HomeSection>
    );
});

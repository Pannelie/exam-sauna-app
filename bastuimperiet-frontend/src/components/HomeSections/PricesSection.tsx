import React from "react";
import { MenuTitle } from "../MenuTitle";
import { PriceContainer } from "../PriceContainer/PriceContainer";
import { HomeSection } from "./HomeSection/HomeSection";
import { TextBox } from "../TextBox/TextBox";

export const PricesSection = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <HomeSection id="priser" className="home_prices-section" ref={ref}>
            <div className="home_prices--group">
                <MenuTitle title="Hyra" />
                <div className="home_prices--grid">
                    <PriceContainer day="Vardag" price="600kr" text="Dygnspris sön-tors" />
                    <PriceContainer day="Helg" price="800kr" text="Dygnspris fre-lör" />
                    <PriceContainer day="Storhelg" price="950kr" text="Dygnspris intill röd dag" />
                    <PriceContainer day="Vecka" price="2000kr" text="7 dygn" />
                    <PriceContainer day="Månad" price="6000kr" text="31 dygn" />
                    <PriceContainer info text="Kontakta oss för längre bokningar" />
                </div>
            </div>

            <div className="home_prices--group">
                <MenuTitle title="Extra tillbehör" />
                <div className="home_prices--grid home_prices--grid-extra">
                    <PriceContainer extra="Ved" price="120kr" text="ca. 20 liter" />
                    <PriceContainer extra="Städning" price="450kr" text="Engångskostnad" />
                    <PriceContainer extra="Doftstenar" price="20kr" text="Menthol" />
                </div>
            </div>
            <div className="home_prices--center">
                <TextBox title="Vi kör ut bastun till dig!" />
                <TextBox text="Startavgift 1000kr" />
                <TextBox text="En tur 40kr/km" />
                <TextBox text="Tur&Retur 80kr/km" />
            </div>
        </HomeSection>
    );
});

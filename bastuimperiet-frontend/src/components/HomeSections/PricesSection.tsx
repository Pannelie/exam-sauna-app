import { Typography } from "@mui/material";
import { PriceContainer } from "../PriceContainer/PriceContainer";
import { HomeSection } from "./HomeSection";
import { TextBox } from "../TextBox/TextBox";

export function PricesSection() {
    return (
        <HomeSection className="home_prices-section">
            <div className="home_prices-group">
                <Typography id="priser" variant="h3">
                    Hyra
                </Typography>
                <div className="home_prices-grid">
                    <PriceContainer day="Vardag" price="600kr" text="Dygnspris sön-tors" />
                    <PriceContainer day="Helg" price="800kr" text="Dygnspris fre-lör" />
                    <PriceContainer day="Storhelg" price="950kr" text="Dygnspris intill röd dag" />
                    <PriceContainer day="Vecka" price="2000kr" text="7 dygn" />
                    <PriceContainer day="Månad" price="6000kr" text="31 dygn" />
                    <PriceContainer info text="Kontakta oss för längre bokningar" />
                </div>
            </div>

            <div className="home_prices-group">
                <Typography variant="h3">Extra tillbehör</Typography>
                <div className="home_prices-grid home_prices-grid--extra">
                    <PriceContainer extra="Ved" price="120kr" text="ca. 20 liter" />
                    <PriceContainer extra="Städning" price="450kr" text="Engångskostnad" />
                    <PriceContainer extra="Doftstenar" price="20kr" text="Menthol" />
                </div>
            </div>
            <div className="home_prices-group">
                <TextBox title="Vi kör ut bastun till dig" />
            </div>
        </HomeSection>
    );
}

import { Typography } from "@mui/material";
import { PriceContainer } from "../PriceContainer/PriceContainer";
import { HomeSection } from "./HomeSection";

export function PricesSection() {
    return (
        <HomeSection id="priser" className="home_grid-section">
            <Typography variant="h3">Priser</Typography>
            <PriceContainer day="Vardag" price="600kr" text="Dygnspris sön-tors" />
            <PriceContainer day="Helg" price="800kr" text="Dygnspris fre-lör" />
            <PriceContainer day="Storhelg" price="950kr" text="Dygnspris intill röd dag" />
            <PriceContainer day="Vecka" price="2000kr" text="7 dygn" />
            <PriceContainer day="Månad" price="6000kr" text="31 dygn" />
        </HomeSection>
    );
}

import React from "react";
import { MenuTitle } from "../MenuTitle/MenuTitle";
import { PriceContainer } from "../PriceContainer/PriceContainer";
import { HomeSection } from "./HomeSection/HomeSection";
import { TextBox } from "../TextBox/TextBox";
import { useBookingFormStore } from "../../stores/useBookingFormStore";

export const PricesSection = React.forwardRef<HTMLElement>((__, ref) => {
    const apiPrices = useBookingFormStore((state) => state.prices);

    const fallbackPrices = {
        weekday: 1600,
        weekend: 800,
        special: 950,
        weekly: 2000,
        monthly: 6000,
        firewood: 40,
        cleaning: 995,
        scent: 20,
        delivery: 1000,
        oneWay: 40,
        return: 80,
    };

    const finalPrices = { ...fallbackPrices, ...Object.fromEntries(Object.entries(apiPrices || {}).filter(([_, v]) => v != null)) };

    // Om antalet nycklar i apiPrices är färre än i fallback, eller om apiPrices saknas helt
    const hasMissingData = !apiPrices || Object.keys(fallbackPrices).some((key) => apiPrices[key as keyof typeof fallbackPrices] == null);

    return (
        <HomeSection id="priser" className="home_prices-section" ref={ref}>
            {hasMissingData && (
                <div
                    style={{
                        background: "#ffe0b2",
                        color: "#a65c00",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        textAlign: "center",
                        fontWeight: 500,
                    }}
                >
                    Priser uppdateras snart! Kontakta oss för aktuella priser och erbjudanden.
                </div>
            )}
            <div className="home_prices--group">
                <MenuTitle title="Hyra" />
                <div className="home_prices--grid">
                    <PriceContainer day="Vardag" price={finalPrices.weekday} text="Dygnspris sön-tors" fallback={hasMissingData} />
                    <PriceContainer day="Helg" price={finalPrices.weekend} text="Dygnspris fre-lör" fallback={hasMissingData} />
                    <PriceContainer day="Storhelg" price={finalPrices.special} text="Dygnspris intill röd dag" fallback={hasMissingData} />
                    <PriceContainer day="Vecka" price={finalPrices.weekly} text="7 dygn" fallback={hasMissingData} />
                    <PriceContainer day="Månad" price={finalPrices.monthly} text="31 dygn" fallback={hasMissingData} />
                    <PriceContainer info text="Kontakta oss för längre bokningar" />
                </div>
            </div>

            <div className="home_prices--group">
                <MenuTitle title="Extra tillbehör" />
                <div className="home_prices--grid home_prices--grid-extra">
                    <PriceContainer extra="Ved" price={finalPrices.firewood} text="ca. 20 liter" fallback={hasMissingData} />
                    <PriceContainer extra="Städning" price={finalPrices.cleaning} text="Engångskostnad" fallback={hasMissingData} />
                    <PriceContainer extra="Doftstenar" price={finalPrices.scent} text="Menthol" fallback={hasMissingData} />
                </div>
            </div>
            <div className="home_prices--center">
                <TextBox title="Vi kör ut bastun till dig!" />
                <TextBox text={`Startavgift ${finalPrices.delivery}kr`} />
                <TextBox text={`En tur ${finalPrices.oneWay}kr/km`} />
                <TextBox text={`Tur&Retur ${finalPrices.return}kr/km`} />
            </div>
        </HomeSection>
    );
});

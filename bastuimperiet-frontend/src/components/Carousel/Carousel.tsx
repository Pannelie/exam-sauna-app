import "./carousel.css";
import { Paper, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../assets/OutsideParking.jpg";
import img2 from "../../assets/hero.png";

const images = [img1, img2];

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "12px",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("md")]: {},
}));
export const Carousel = () => (
    <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={false}
        loop
        className="swiper_container"
    >
        {images.map((img, index) => (
            <SwiperSlide key={index} className="swiper_slide">
                <img src={img} alt="bastu" className="carousel_image" />
            </SwiperSlide>
        ))}
    </Swiper>
);

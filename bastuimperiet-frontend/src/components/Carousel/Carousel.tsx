import "./carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../assets/OutsideParking.webp";
import img2 from "../../assets/hero.webp";

const images = [img1, img2];

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

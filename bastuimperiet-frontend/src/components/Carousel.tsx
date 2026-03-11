import { Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../assets/OutsideParking.jpg";
import img2 from "../assets/hero.png";
import img3 from "../assets/wood2.jpg";

const images = [img1, img2, img3];

export const Carousel = () => (
    <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={false}
        loop
        style={{ width: "100%", height: "420px" }}
    >
        {images.map((img, index) => (
            <SwiperSlide key={index}>
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={img}
                        alt="bastu"
                        style={{
                            width: "100%",
                            height: "420px",
                            objectFit: "cover",
                        }}
                    />
                </Paper>
            </SwiperSlide>
        ))}
    </Swiper>
);

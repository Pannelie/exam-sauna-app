import { Box, Paper, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../assets/sauna1.jpg";
import img2 from "../../assets/sauna2.jpg";
import img3 from "../../assets/sauna3.jpg";

export default function InfoSection() {
    const images = [img1, img2, img3];

    return (
        <Box className="info_section">
            {/* Carousel */}
            <Box className="carousel_container">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Paper
                                elevation={4}
                                sx={{
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "4px solid #e8e8e8",
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
            </Box>

            {/* Text Paper */}
            <Paper
                elevation={6}
                sx={{
                    padding: "3rem",
                    maxWidth: "600px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography variant="h3" gutterBottom fontWeight="bold">
                    Välkommen till Bastuimperiet!
                </Typography>

                <Typography>
                    Här kan du hyra en vedeldad bastu på släp och njuta av en härlig bastuupplevelse ute i naturen. Med vår bastu tar du dig
                    enkelt till dina favoritplatser vid sjön, stugan eller vart du vill.
                </Typography>
            </Paper>
        </Box>
    );
}

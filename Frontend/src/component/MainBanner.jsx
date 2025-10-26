import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Remove Navigation import
import { assets } from "../assets/assets";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Remove navigation CSS import

const MainBanner = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]} // Remove Navigation from modules
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={assets.main_banner_bg} className="w-full" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.main_banner_bg_next} className="w-full" alt="Banner 2" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBanner;
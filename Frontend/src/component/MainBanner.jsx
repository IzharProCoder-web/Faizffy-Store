import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets/assets";

import "swiper/css";
import "swiper/css/pagination";

const MainBanner = () => {
  return (
    <div className="w-full xl:h-[350px] lg:h-[300px] md:h-[300px] sm:h-[250px] xs:h-[200px]">
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
        modules={[Autoplay, Pagination]}
        className="mySwiper w-full m-0 p-0"
      >
        <SwiperSlide className="w-full  h-full">
          <img
            src={assets.main_banner_bg}
            className="w-full h-full object-cover object-center"
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <img
            src={assets.main_banner_bg_next}
            className="w-full h-full object-cover object-center"
            alt="Banner 2"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBanner;

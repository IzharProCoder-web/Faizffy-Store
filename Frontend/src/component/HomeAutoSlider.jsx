import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HomeAutoSlider = () => {
  const sliderContent = [
    "Faziffy Perfumes",
    "Natural Fragrances", 
    "Premium Scents",
    "Luxury Collections"
  ];

  return (
    <div 
      className="overflow-hidden  p-3"
      role="marquee"
      aria-label="Featured perfume collections"
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={4000}
        allowTouchMove={false}
        className="marquee-swiper"
      >
        {sliderContent.map((text, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <p className="text-2xl md:text-4xl lg:text-[40px] pr-8 md:pr-24 font-bold 
               text-white 
               [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]
               hover:text-amber-50 transition-colors duration-200">
              {text}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeAutoSlider;
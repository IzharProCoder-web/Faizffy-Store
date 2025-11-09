import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets/assets";

import "swiper/css";
import "swiper/css/pagination";

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      large: assets.main_banner_bg,
      small: assets.main_banner_bg_sm,
      alt: "Fresh Groceries - Banner 1",
    },
    {
      large: assets.main_banner_bg_next,
      small: assets.main_banner_bg_next_sm,
      alt: "Special Offers - Banner 2",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Desktop & Tablet (≥768px) */}
      <div className="w-full h-full overflow-hidden hidden md:block">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination-desktop",
            type: "bullets",
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Autoplay, Pagination]}
          className="h-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner.large}
                alt={banner.alt}
                className="w-full h-full "
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Dots */}
        <div className="custom-pagination-desktop absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-8" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile (<768px) */}
      <div className="w-full h-[120px] overflow-hidden md:hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination-mobile",
            type: "bullets",
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Autoplay, Pagination]}
          className="h-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner.small}
                alt={banner.alt}
                className="w-full h-full "
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Dots for Mobile */}
        <div className="custom-pagination-mobile absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index + "-mobile"}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainBanner;
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img src={assets.main_banner_bg} className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} className="w-full block md:hidden object-bottom" />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-start md:justify-center pb-16 sm:pb-24 md:pb-0 pt-4 sm:pt-6 md:pt-0 md:pl-18 lg:pl-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 sm:max-w-96 md:max-w-2-80 lg:max-w-105 leading-tight sm:leading-snug md:leading-tight lg:leading-15 text-black">
          Discover new scents for every occasion.
        </h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mt-6 font-medium pt-6 sm:pt-8 md:pt-10">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-6 sm:px-7 md:px-9 py-2 sm:py-3 bg-[#000] hover:bg-[#fff] hover:text-[#000] transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="md:hidden transition group-hover:translate-x-1"
            />
          </Link>

          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
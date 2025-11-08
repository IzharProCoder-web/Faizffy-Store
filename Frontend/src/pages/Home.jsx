import React from "react";
import MainBanner from "../component/MainBanner";
import BestSeller from "../component/BestSeller";
import BottomBanner from "../component/BottomBanner";
import NewsLetter from "../component/NewsLetter";
import Reviews from "../component/Reviews";
import HomeAutoSlider from "../component/HomeAutoSlider";

const Home = () => {
  return (
    <div>
      <MainBanner />
      <HomeAutoSlider />
      <BestSeller />
      <Reviews />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;

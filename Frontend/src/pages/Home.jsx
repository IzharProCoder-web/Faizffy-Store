import React from "react";
import MainBanner from "../component/MainBanner";
import BestSeller from "../component/BestSeller";
import BottomBanner from "../component/BottomBanner";
import NewsLetter from "../component/NewsLetter";

const Home = () => {
  return (
    <div>
      <MainBanner />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;

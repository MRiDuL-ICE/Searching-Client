import React from "react";
import Banner from "../Banner/Banner";
import About from "../About/About";
import HowItWorks from "../HowItWorks/HowItWorks";
import BannerAllItems from "../Banner/BannerAllItems";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  return (
    <div>
      <Helmet>
        <title>Searching | Home</title>
      </Helmet>
      <Banner></Banner>
      <BannerAllItems></BannerAllItems>
      <HowItWorks></HowItWorks>
      <About></About>
    </div>
  );
};

export default HomeLayout;

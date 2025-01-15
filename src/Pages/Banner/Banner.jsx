import React from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import bg from "../../assets/img/banner bg-Photoroom.png";
import bg1 from "../../assets/img/1.jpg";
import bg2 from "../../assets/img/2.jpg";
import bg3 from "../../assets/img/3.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* div 1 */}
        <SwiperSlide>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            className="md:w-10/12 lg:w-10/12 mx-auto"
          >
            <motion.div className="hero h-screen w-full">
              <motion.div className="hero-content w-full flex-col md:flex-row-reverse lg:flex-row-reverse justify-between">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  src={bg1}
                  className="md:w-[16rem] lg:w-[22rem] w-[16rem]  rounded-md shadow-2xl"
                />
                <motion.div className="md:w-3/4 lg:w-2/4 backdrop-blur-xl  rounded-md p-4">
                  <motion.h1 className="md:text-5xl text-2xl font-bold">
                    Reuniting You with What’s Lost
                  </motion.h1>
                  <motion.p className="py-6 text-black">
                    Our community-driven platform is your gateway to
                    reconnecting with lost belongings. By joining us, you gain
                    access to a network of individuals dedicated to helping
                    recover misplaced or lost items. Thousands have already used
                    our platform to locate valuable possessions such as wallets,
                    keys, phones, and more. Together, we create a supportive
                    environment where finding your lost items becomes easier and
                    faster.
                  </motion.p>
                  <Link to={"/addItems"}>
                    <motion.button className="p-2 md:py-3 bg-[#210066] hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-white">
                      Report Lost Item
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </SwiperSlide>
        {/* div 2 */}
        <SwiperSlide>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            className="md:w-10/12 lg:w-10/12 mx-auto"
          >
            <motion.div className="hero h-screen w-full">
              <motion.div className="hero-content w-full flex-col md:flex-row-reverse lg:flex-row-reverse justify-between">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  src={bg2}
                  className="md:w-[16rem] lg:w-[22rem] w-[16rem]  rounded-md shadow-2xl"
                />
                <motion.div className="md:w-3/4 lg:w-2/4 backdrop-blur-xl  rounded-md p-4">
                  <motion.h1 className="md:text-5xl text-2xl font-bold">
                    Together, We Help You Find What’s Missing
                  </motion.h1>
                  <motion.p className="py-6 text-black">
                    Our platform thrives on the power of community collaboration
                    to reunite people with their lost belongings. Whether it’s a
                    cherished personal item or an everyday essential, we’re here
                    to help. By connecting individuals who’ve found items with
                    those who’ve lost them, we create a seamless process to
                    ensure nothing stays misplaced for long. Join a trusted
                    network of like-minded individuals and experience the ease
                    of finding what’s missing, together.
                  </motion.p>
                  <Link to={"/addItems"}>
                    <motion.button className="p-2 md:py-3 bg-[#210066] hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-white">
                      Report Found Item
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </SwiperSlide>
        {/* div 3 */}
        <SwiperSlide>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            className="md:w-10/12 lg:w-10/12 mx-auto"
          >
            <motion.div className="hero h-screen w-full">
              <motion.div className="hero-content w-full flex-col md:flex-row-reverse lg:flex-row-reverse justify-between">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  src={bg3}
                  className="md:w-[16rem] lg:w-[22rem] w-[16rem] rounded-md shadow-2xl"
                />
                <motion.div className="md:w-3/4 lg:w-2/4 backdrop-blur-xl  rounded-md p-4">
                  <motion.h1 className="md:text-5xl text-2xl font-bold">
                    Making Lost and Found Simple
                  </motion.h1>
                  <motion.p className="py-6 text-black">
                    We believe finding lost belongings should be straightforward
                    and stress-free. Our platform simplifies the process by
                    connecting those who’ve misplaced items with a community
                    ready to help. Whether it’s something you’ve lost or
                    something you’ve found, we provide an easy-to-use solution
                    that takes the hassle out of the search. With our support,
                    reuniting with your valuables has never been easier. Let’s
                    make lost and found simple, together.
                  </motion.p>
                  <Link to={"/addItems"}>
                    <motion.button className="p-2 md:py-3 bg-[#210066] hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-white">
                      Report Lost Item
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

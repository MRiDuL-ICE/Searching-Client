import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/img/aboutImage.jpg"; // Replace with your image path
import { FaSearch, FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="py-16 my-10 md:my-0 bg-[#210066] text-base-100">
      <div className="px-4 md:w-10/12 mx-auto justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="">
            Learn more about our mission, vision, and how we help you find your
            lost items.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <img
              src={aboutImage}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 md:pl-12"
          >
            <h3 className="md:text-2xl lg:text-3xl font-bold  mb-4">
              Our Mission
            </h3>
            <p className=" mb-4">
              Our mission is to connect individuals who have lost personal
              belongings with those who may have found them. We aim to create a
              seamless process to ensure nothing stays misplaced for long.
            </p>
            <h3 className="md:text-2xl lg:text-3xl font-bold  mb-4">
              Our Vision
            </h3>
            <p className="">
              We envision a world where lost items are quickly and easily
              returned to their rightful owners through the power of community
              collaboration and advanced technology.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <h3 className="text-3xl font-bold mb-4">Search. Find. Ship.</h3>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <FaSearch className="text-4xl text-base-100" />
            <FaMapMarkerAlt className="text-4xl text-base-100" />
            <FaShippingFast className="text-4xl text-base-100" />
          </div>
          <p className="text-lg">Anytime. Anyplace. Anywhere.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

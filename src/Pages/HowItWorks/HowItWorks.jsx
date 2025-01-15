import React from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaClipboardList,
  FaUserCheck,
  FaBoxOpen,
} from "react-icons/fa";
import idea from "../../assets/img/idea.png";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaClipboardList className="text-4xl text-[#210066]" />,
      title: "Report a lost or found item",
      description:
        "Fill the declaration and give as much detail as possible (location, type of item, description) to help identify it quickly.",
    },
    {
      icon: <FaSearch className="text-4xl text-[#210066]" />,
      title: "How Searching Help You",
      description:
        "Our advanced algorithm matches lost items with found ones based on descriptions, locations, and timing.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-[#210066]" />,
      title: "Prove ownership of the item",
      description:
        "Once matched, verify ownership through security questions. Our partner will validate your claim before proceeding.",
    },
    {
      icon: <FaBoxOpen className="text-4xl text-[#210066]" />,
      title: "Get it back!",
      description:
        "After authentication, receive pickup or delivery information. Remember to reference your item number.",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="container px-4 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            How <span className="text-[#210066]">SEARCHING</span> Help You
          </h2>
          <p className="text-gray-600">How we help you find your lost items</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                rotate: [0, -4, 4, -4, 0], // Creates a shaking effect
                transition: {
                  duration: 0.6,
                  repeat: 1,
                  repeatType: "reverse",
                },
              }}
              onHoverEnd={(e) => {
                e.target.style.transform = "rotate(0deg)";
              }}
              whileTap={{ scale: 0.95 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-left flex items-center md:w-9/12 lg:w-7/12 p-4 mx-auto shadow-lg rounded-lg"
        >
          <motion.div className="w-44">
            <motion.img
              src={idea}
              alt=""
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>
          <motion.div className="">
            <h3 className="text-2xl font-bold mb-4">You should know</h3>
            <p className="text-gray-600">
              Our platform uses secure verification processes to ensure items
              are returned to their rightful owners.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;

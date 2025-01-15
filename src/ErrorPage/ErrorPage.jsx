import React from "react";
import errorPage from "../assets/lottie/error.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Helmet>
        <title>Searching | 404 Page Not Found</title>
      </Helmet>
      <Lottie className="h-screen" animationData={errorPage}></Lottie>
      <button
        className="flex items-center gap-2 p-2 px-4 lg:px-6 md:px-6 rounded-md bg-[#210066] hover:bg-[#6a36da] text-white absolute top-10 left-4"
        onClick={() => navigate(-1)}
      >
        <IoArrowUndo />
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerAnimation from "../../assets/lottie/register.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const { newCreateUser, loading, setLoading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const displayName = data?.name;
    const email = data?.email;
    const photoURL = data?.photoURL;
    const password = data?.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Invalid Password!",
        text: "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.",
        icon: "error",
      });
      return;
    }
    setLoading(true);
    newCreateUser(displayName, email, photoURL, password)
      .then((res) => {
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered.",
          confirmButtonColor: "#6330F6",
        });
        // Send this data to the server
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Invalid Credential",
          text: err,
          confirmButtonColor: "#6330F6",
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>Searching | Registration</title>
      </Helmet>
      <div className="my-14 flex lg:flex-row flex-col-reverse md:w-10/12 mx-auto justify-center md:gap-16 items-center">
        <div className="bg-white p-8 rounded shadow-lg lg:w-4/12 md:w-5/12 w-11/12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#210066]">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#210066]">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-[#210066] rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#210066]">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-[#210066] rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#210066]">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="w-full px-3 py-2 border border-[#210066] rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#210066]">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-[#210066] rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#210066] text-white py-2 rounded hover:rounded-3xl transform transition-all duration-500"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#210066] hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="md:w-[32rem] lg:w-[26rem] w-[10rem]">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;

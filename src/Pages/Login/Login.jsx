import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../../assets/lottie/login.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSignIn, signInWithGoogle, loading, setLoading, setUser, user } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const email = data?.email;
    const password = data?.password;

    setLoading(true);

    userSignIn(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        const userMail = { email: email };

        Swal.fire({
          title: "Successful!",
          text: "Login successfully done!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong!",
          text: err,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGooglelogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        const user = res.user;
        setUser(user);
        Swal.fire({
          title: "Successful!",
          text: "Login successfully done!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong!",
          text: err,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Searching | Login</title>
      </Helmet>
      <div className="my-14 flex lg:flex-row flex-col-reverse md:w-10/12 mx-auto justify-center md:gap-16 items-center">
        <div className="bg-white p-8 rounded shadow-lg lg:w-4/12 md:w-9/12 w-11/12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#210066]">
            Login
          </h2>
          <div className="text-center flex mx-auto justify-center ">
            <button
              onClick={handleGooglelogin}
              className="px-4 border border-[#817f7f] py-3 font-semibold rounded-md flex gap-2 items-center btn bg-white hover:bg-[#ffffff]"
            >
              <FcGoogle /> Login with Google
            </button>
          </div>
          <div className="text-center flex justify-center py-4">
            <p>OR</p>
          </div>
          <form onSubmit={handleSubmit}>
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
              <label className="block text-[#210066]">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-[#210066] rounded"
                required
              />
            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#210066] text-white py-2 rounded hover:bg-[#3a007d]"
              disabled={loading}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#210066] hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div className="md:w-[26rem] lg:w-[26rem] w-[10rem]">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error("Error caught in interceptor", error);

        if (error.status === 401 || error.status === 403) {
          logOut()
            .then((res) => {
              Swal.fire({
                title: "Unauthorized access!",
                text: "You have been logged out!",
                icon: "error",
              });
              navigate("/login");
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;

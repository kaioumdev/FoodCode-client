import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Ensure this matches your backend port
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // axiosSecure.interceptors.request.use(
  //   function (config) {
  //     const token = localStorage.getItem("access-token");
  //     console.log("Request stopped by interceptor before adding token", token);
  //     if (token) {
  //       config.headers.authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage/sessionStorage
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        console.warn('⚠️ No token found, request might be blocked.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;
      // console.log("Status error in the interceptors response", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

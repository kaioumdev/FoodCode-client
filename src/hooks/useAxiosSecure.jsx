import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();
  // const {logOut} = useAuth()
  // //request interceptor to authorize headers for every secure call to the api
  // axiosSecure.interceptors.request.use(
  //   function (config) {
  //     const token = localStorage.getItem("access-token");
  //     console.log("request stopped by interceptor");
  //     config.headers.Authorization = `Bearer ${token}`;
  //     // Do something before request is sent
  //     return config;
  //   },
  //   function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );

  // // Add a response interceptor
  // axios.interceptors.response.use(
  //   function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     return response;
  //   },
  //    async (error) => {
  //     const status = error.response?.status;
  //     console.log("status error in the interceptor", status);
  //     // if(status === 401 || status ===403){
  //     //   await logOut()
  //     //   navigate("/login")
  //     // }
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     return Promise.reject(error);
  //   }
  // );
  return axiosSecure;
};

export default useAxiosSecure;

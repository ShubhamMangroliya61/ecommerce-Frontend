import axios from "axios";
const baseurl = "http://localhost:5050";

const axiosInstance = axios.create({
  baseURL: baseurl,
  withCredentials: false,
  headers: {
    'ngrok-skip-browser-warning': true
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = "69420";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
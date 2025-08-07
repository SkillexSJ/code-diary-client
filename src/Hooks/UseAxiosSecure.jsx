import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  headers: { "Content-Type": "application/json" },
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        } else if (user?.getIdToken) {
          // For Firebase Google
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

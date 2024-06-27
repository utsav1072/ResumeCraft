import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/authcontext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens) {
      return req;
    }

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh error (e.g., redirect to login)
      throw error;
    }
  });

  return axiosInstance;
};

export default useAxios;

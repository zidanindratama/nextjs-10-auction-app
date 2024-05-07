import axios from "axios";
import Cookies from "js-cookie";

const PROD_URL = "https://auction-gilt.vercel.app";
const DEV_URL = "http://localhost:3100";

const axiosInstance = axios.create({
  baseURL: PROD_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

async function refreshAccessToken() {
  const refreshToken = Cookies.get("refreshToken");
  // const token = refreshToken?.replace(/"/g, ""); // Removing all occurrences of double quotes

  if (!refreshToken) {
    throw new Error("No refreshToken found");
  }

  const newAccessToken = await axios.post(
    `${PROD_URL}/auth/refresh-token`,
    null,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  Cookies.set("accessToken", newAccessToken.data.access_token);
  return newAccessToken.data.access_token;
}

// Intercept request dan set Authorization header dengan bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response dan coba refresh token jika diperlukan
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // Tangani error jika refreshToken gagal
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

import axios from "axios";
import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}); 

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("demo_token");
  if(token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  }
  return config;
});

export default api;
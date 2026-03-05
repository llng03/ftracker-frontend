import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
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
import axios from "axios";

const API = axios.create({
  baseURL: "https://project-management-tool-38dj.onrender.com/api",
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or your storage key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

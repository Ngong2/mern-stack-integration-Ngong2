import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://mern-stack-integration-ngong2.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH ENDPOINTS
export const register = (payload) => API.post("/auth/register", payload).then(res => res.data);
export const login = (payload) => API.post("/auth/login", payload).then(res => res.data);
export const logout = () => API.post("/auth/logout").then(res => res.data);
export const getMe = () => API.get("/auth/me").then(res => res.data);
export const forgotPassword = (email) => API.post("/auth/forgot-password", { email }).then(res => res.data);
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password }).then(res => res.data);

// POSTS ENDPOINTS
export const getPosts = (page = 1, search = "", category = "") => 
  API.get(`/posts?page=${page}&search=${search}&category=${category}`).then(res => res.data);

export const getPost = (id) => API.get(`/posts/${id}`).then(res => res.data);

export const createPost = (formData) =>
  API.post("/posts", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => res.data);

export const updatePost = (id, formData) =>
  API.put(`/posts/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => res.data);

export const deletePost = (id) => API.delete(`/posts/${id}`).then(res => res.data);

export const getCategories = () => API.get("/categories").then(res => res.data);

export default API;

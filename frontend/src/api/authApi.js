import axios from "axios";

// Localhost: http://localhost:5000
// Render: https://elpip-internship-taskshare-mern-app.onrender.com

const api = axios.create({
  baseURL: "https://elpip-internship-taskshare-mern-app.onrender.com",
  withCredentials: true,
});

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const deleteUser = async () => {
  const response = await api.delete("/api/auth");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/check-auth");
  return response.data;
};

export const getAllUsernames = async () => {
  const response = await api.get("/api/auth/usernames");
  return response.data;
};

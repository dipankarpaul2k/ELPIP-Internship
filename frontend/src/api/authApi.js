import axios from "axios";
// Localhost: http://localhost:5000
// Render: https://elpip-internship-taskshare-mern-app.onrender.com

const api = axios.create({
  baseURL: "https://elpip-internship-taskshare-mern-app.onrender.com/api",
  withCredentials: true,
});

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const deleteUser = async () => {
  const response = await api.delete("/auth");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/check-auth");
  return response.data;
};

export const getAllUsernames = async () => {
  const response = await api.get("/auth/usernames");
  return response.data;
};

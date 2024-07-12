// import axios from "axios";
import { api } from "./axiosConfig";

// // Localhost: http://localhost:5000
// // Render: https://elpip-internship-taskshare-mern-app.onrender.com

// const api = axios.create({
//   baseURL: "https://elpip-internship-taskshare-mern-app.onrender.com",
//   withCredentials: true,
// });

export const createTask = async (taskData) => {
  const response = await api.post("/api/tasks", taskData);
  return response.data;
};

export const getTasks = async () => {
  const response = await api.get("/api/tasks");
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/api/tasks/${taskId}`, taskData);
  return response.data;
};

export const toggleTaskCompletion = async (taskId) => {
  const response = await api.put(`/api/tasks/${taskId}/toggle-completion`);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/api/tasks/${taskId}`);
  return response.data;
};

export const shareTask = async ({ taskId, shareWithUsernames }) => {
  const response = await api.post("/api/tasks/share", {
    taskId,
    shareWithUsernames,
  });
  return response.data;
};

export const getSharedTasks = async () => {
  const response = await api.get("/api/tasks/shared");
  return response.data;
};

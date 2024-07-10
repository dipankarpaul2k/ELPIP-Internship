import express from "express";
import {
  createTask,
  getTasks,
  toggleTaskCompletion,
  shareTask,
  getSharedTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// Initialize Express Router
const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post("/", authMiddleware, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for the current user
// @access  Private
router.get("/", authMiddleware, getTasks);

// @route   PUT /api/tasks/:id/toggle-completion
// @desc    Toggle task completion status
// @access  Private
router.put("/:id/toggle-completion", authMiddleware, toggleTaskCompletion);

// @route   PUT /api/tasks/:id
// @desc    Update task details
// @access  Private
router.put("/:id", authMiddleware, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", authMiddleware, deleteTask);

// @route   POST /api/tasks/share
// @desc    Share task with another user
// @access  Private
router.post("/share", authMiddleware, shareTask);

// @route   GET /api/tasks/shared
// @desc    Get tasks shared with the current user
// @access  Private
router.get("/shared", authMiddleware, getSharedTasks);

export default router;

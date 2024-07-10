import express from "express";
import {
  register,
  login,
  logout,
  deleteUser,
  getCurrentUser,
  getAllUsernames,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// Initialize Express Router
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", login);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", authMiddleware, logout);

// @route   DELETE /api/auth
// @desc    Delete user and their tasks
// @access  Private
router.delete("/", authMiddleware, deleteUser);

// @route   GET /api/auth/check-auth
// @desc    Get current user
// @access  Public
router.get("/check-auth", authMiddleware, getCurrentUser);

// @route   GET /api/auth/usernames
// @desc    Get All usernames
// @access  Private
router.get("/usernames", authMiddleware, getAllUsernames);

export default router;

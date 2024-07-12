import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import authConfig from "../config/auth.js";

// Register a new user
export const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // console.log(user);

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, authConfig.secret, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // domain: '.render.com'
      });
      res.json({ msg: "Registration successful", token, user });
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    console.error(error?.response?.data?.msg);

    // if (error.name === "ValidationError") {
    //   const errors = Object.values(error.errors).map((err) => err.message);
    //   console.log({ msg: errors.join(", ") });
    //   return res.status(400).json({ msg: errors.join(", ") });
    // }

    res.status(500).send("Server Error");
  }
};

// Login user
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials (username)." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials (password)." });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, authConfig.secret, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // domain: '.render.com'
      });
      res.json({ msg: "Login successful", token, user });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ msg: "Logout successful" });
};

// Delete user and their tasks
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await Task.deleteMany({ owner: req.user.id });
    await user.remove();

    res.clearCookie("token");
    res.json({ msg: "User and tasks deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get the current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all users with only username field
export const getAllUsernames = async (req, res) => {
  try {
    const users = await User.find().select("username");
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

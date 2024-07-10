import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

const authMiddleware = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;

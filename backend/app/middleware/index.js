import jwt from "jsonwebtoken";
import { handleResponse } from "../utils/index.js";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return handleResponse(res, 401, "No token, access denied", null, true);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id)
    if (!user) return handleResponse(res, 401, "Invalid token user", null, true);

    req.user = {
      id: user._id.toString(),
    };

    next();
  } catch (err) {
    return handleResponse(res, 401, "Unauthorized access", null, true);
  }
};
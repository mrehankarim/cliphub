import apiError from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      throw new apiError(400, "Unauthorized access");
    }

    const decodedToken = jwt.verify(token, process.env.ACSESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(400, error?.message || "Invalid Access Token");
  }
});

export default verifyJWT;

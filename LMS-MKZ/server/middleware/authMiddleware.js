import createError from "../utils/error.js";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(createError(401, "Please log in again"));
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Fetch full user from DB
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        req.user = user; // 👈 attach user object with _id, role, email, etc.
        next();
    } catch (err) {
        return next(createError(401, "Invalid or expired token"));
    }
};

export const authorizedRole = (...roles) => async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(createError(403, "You do not have permission"));
    }
    next();
};

export const verifySubscription = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) return next(createError(404, "User not found"));

    if (user.role !== "ADMIN" && user.subscription?.status !== "active") {
        return next(createError(403, "Please subscribe to access this"));
    }
    next();
};

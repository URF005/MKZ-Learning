// U:\LMS-MKZ\server\middleware\auth.js
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

        // Fetch full user from DB including subscriptions
        const user = await User.findById(decoded.id).select(
            "name email role subscriptions"
        );
        if (!user) {
            return next(createError(404, "User not found"));
        }

        req.user = user; // 👈 attach user object with subscriptions
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

// ✅ Updated verifySubscription for per-course access
export const verifySubscription = async (req, res, next) => {
    const user = await User.findById(req.user._id).select("role subscriptions");
    if (!user) return next(createError(404, "User not found"));

    // Admins always bypass
    if (user.role === "ADMIN") {
        return next();
    }

    const courseId = req.params.id; // assuming :id in route = courseId

    const sub = user.subscriptions?.find(
        (s) => s.courseId.toString() === courseId && s.status === "active"
    );

    if (!sub) {
        return next(createError(403, "Please subscribe to access this"));
    }

    next();
};

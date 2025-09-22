import createError from "../utils/error.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { v2 } from "cloudinary";
import fs from "fs/promises";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

//
// 📝 SIGNUP
//
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(createError(401, "All input fields are required"));
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(401)
                .json({ success: false, message: "Email already exists" });
        }

        const user = new User({
            name,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url:
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            },
        });

        try {
            await user.validate();
        } catch (error) {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res
                .status(400)
                .json({ success: false, message: validationErrors.join(", ") });
        }

        if (req.file) {
            try {
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: "image",
                    folder: "lms",
                    width: 250,
                    height: 250,
                    gravity: "faces",
                    crop: "fill",
                });

                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (error) {
                return next(
                    createError(500, error.message || "File not uploaded, please try again")
                );
            }
        }

        await user.save();
        user.password = undefined;
        const token = await user.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// 🔑 LOGIN
//
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(createError(401, "All input fields are required"));
        }

        const userData = await User.findOne({ email }).select("+password");
        if (!userData) {
            return next(createError(404, "User with this email not found"));
        }

        const comparePassword = await bcryptjs.compare(password, userData.password);
        if (!comparePassword) {
            return next(createError(401, "Invalid email or password"));
        }

        const token = await userData.generateToken();
        userData.password = undefined;

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: `Welcome back ${userData.name}`,
            userData,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// 🚪 LOGOUT
//
export const logout = (req, res, next) => {
    try {
        res.cookie("token", null, {
            httpOnly: true,
            maxAge: 0,
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// 👤 GET PROFILE
//
export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.status(200).json({
            success: true,
            message: "User details",
            user,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// 🔐 FORGOT PASSWORD
//
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(createError(400, "Email is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(createError(404, "User with this email not found"));
    }

    // Generate reset token
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = "Reset Your Password";
    const message = `
    <p>You can reset your password by clicking the link below:</p>
    <a href="${resetPasswordUrl}" target="_blank">Reset Password</a>
    <br/><br/>
    <p>If the above link does not work, copy and paste this URL in a new tab:</p>
    <p>${resetPasswordUrl}</p>
    <br/>
    <p>If you did not request this, kindly ignore.</p>
  `;

    try {
        await sendMail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password email sent to ${email}`,
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        return next(createError(500, "Email could not be sent. Try again later."));
    }
};

//
// 🔄 RESET PASSWORD
//
export const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        const forgotPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                createError(400, "Token is invalid or expired, please try again later")
            );
        }

        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// 🔑 CHANGE PASSWORD
//
export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!oldPassword || !newPassword) {
            return next(createError(404, "All fields are required"));
        }

        const user = await User.findById(userId).select("+password");
        if (!user) {
            return next(createError(400, "User does not exist"));
        }

        const comparePassword = await bcryptjs.compare(oldPassword, user.password);
        if (!comparePassword) {
            return next(createError(401, "Invalid old password"));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// ✏️ UPDATE PROFILE
//
export const updateProfile = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!name) {
            return next(createError(400, "Name is required"));
        }
        if (!user) {
            return next(createError(400, "User does not exist"));
        }

        if (name) {
            user.name = name;
        }

        if (req.file) {
            await v2.uploader.destroy(user.avatar.public_id, {
                resource_type: "image",
            });

            try {
                const result = await v2.uploader.upload(req.file.path, {
                    resource_type: "image",
                    folder: "lms",
                    width: 250,
                    height: 250,
                    gravity: "faces",
                    crop: "fill",
                });

                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (error) {
                return next(
                    createError(500, error.message || "File not uploaded, please try again")
                );
            }
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

//
// ❌ DELETE PROFILE
//
export const deleteProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return next(createError(400, "User does not exist"));
        }

        await v2.uploader.destroy(user.avatar.public_id, {
            resource_type: "image",
        });

        res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

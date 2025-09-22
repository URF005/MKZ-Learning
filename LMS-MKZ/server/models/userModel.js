import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [15, "Name should be less than 15 characters"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
            match: [
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Password must include uppercase, lowercase, number, and special character",
            ],
            select: false,
        },
        avatar: {
            public_id: String,
            secure_url: String,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
        subscription: {
            id: String,
            status: String,
        },
    },
    { timestamps: true }
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔑 Methods
userSchema.methods.generateToken = function () {
    return JWT.sign(
        {
            id: this._id,
            email: this.email,
            subscription: this.subscription,
            role: this.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );
};

userSchema.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min

    return resetToken; // plain string for email link
};

const User = model("User", userSchema);
export default User;

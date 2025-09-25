import { Payment } from "../models/paymentModel.js";
import User from "../models/userModel.js";
import createError from "../utils/error.js";
import cloudinary from "cloudinary";

// Upload receipt
export const uploadReceipt = async (req, res, next) => {
    try {
        if (!req.file) return next(createError(400, "No file uploaded"));

        // 🔒 Prevent duplicate pending/approved subscriptions
        const existing = await Payment.findOne({
            user: req.user._id,
            status: { $in: ["pending", "approved"] },
        });

        if (existing) {
            return next(
                createError(
                    400,
                    "You already have an active or pending subscription. Please wait for admin approval."
                )
            );
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "receipts",
        });

        const payment = await Payment.create({
            user: req.user._id,
            course: req.body.courseId,
            receipt: result.secure_url,
            status: "pending",
        });

        res.status(201).json({
            success: true,
            message: "Receipt uploaded, awaiting admin approval",
            payment,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

// Admin: approve/reject
export const updateTransactionStatus = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        const payment = await Payment.findById(transactionId).populate("user");
        if (!payment) return next(createError(404, "Transaction not found"));

        payment.status = status;
        await payment.save();

        if (status === "approved") {
            payment.user.subscription = { status: "active", id: payment._id };
        } else if (status === "rejected") {
            payment.user.subscription = { status: "inactive", id: null };
        }
        await payment.user.save();

        res.status(200).json({
            success: true,
            message: `Transaction ${status}`,
            payment,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

// Expire subscription (session over)
export const expireSubscription = async (req, res, next) => {
    try {
        const { transactionId } = req.params;

        const transaction = await Payment.findById(transactionId).populate("user");
        if (!transaction) return next(createError(404, "Transaction not found"));

        if (transaction.status !== "approved") {
            return next(createError(400, "Only approved subscriptions can be expired"));
        }

        transaction.status = "expired";
        await transaction.save();

        transaction.user.subscription = { status: "expired", id: null };
        await transaction.user.save();

        res.status(200).json({
            success: true,
            message: "Subscription marked as expired",
            transaction,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

// Get all payments (for admin dashboard)
export const getAllTransactions = async (req, res, next) => {
    try {
        const payments = await Payment.find({})
            .populate("user", "name email")
            .populate("course", "title");

        // Counts
        const approvedCount = payments.filter((p) => p.status === "approved").length;
        const rejectedCount = payments.filter((p) => p.status === "rejected").length;
        const expiredCount = payments.filter((p) => p.status === "expired").length;

        // ✅ Revenue: count all payments that were ever approved
        // (approved OR expired still add to revenue)
        const revenue = payments.reduce((sum, p) => {
            return p.status === "approved" || p.status === "expired"
                ? sum + 499
                : sum;
        }, 0);

        // ✅ Monthly sales: also count expired in the month they were created
        const monthlySalesRecord = Array(12).fill(0);
        payments.forEach((p) => {
            if (p.status === "approved" || p.status === "expired") {
                const month = new Date(p.createdAt).getMonth();
                monthlySalesRecord[month] += 1;
            }
        });

        res.status(200).json({
            success: true,
            payments,
            stats: {
                approved: approvedCount,
                rejected: rejectedCount,
                expired: expiredCount,
                revenue,
            },
            monthlySalesRecord,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

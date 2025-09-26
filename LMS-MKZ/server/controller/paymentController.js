// U:\LMS-MKZ\server\controllers\paymentController.js
import { Payment } from "../models/paymentModel.js";
import User from "../models/userModel.js";
import createError from "../utils/error.js";
import cloudinary from "cloudinary";

// Upload receipt
export const uploadReceipt = async (req, res, next) => {
    try {
        if (!req.file) return next(createError(400, "No file uploaded"));

        // 🔒 Prevent duplicate pending subscriptions for the same course
        const existing = await Payment.findOne({
            user: req.user._id,
            course: req.body.courseId,
            status: { $in: ["pending", "approved"] },
        });

        if (existing) {
            return next(
                createError(
                    400,
                    "You already have an active or pending subscription for this course."
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

        const payment = await Payment.findById(transactionId)
            .populate("user")
            .populate("course");
        if (!payment) return next(createError(404, "Transaction not found"));

        payment.status = status;
        await payment.save();

        const user = payment.user;

        if (status === "approved") {
            // Check if subscription for this course exists
            const existing = user.subscriptions?.find(
                (s) => s.courseId.toString() === payment.course._id.toString()
            );

            if (existing) {
                existing.status = "active";
                existing.transactionId = payment._id;
            } else {
                user.subscriptions.push({
                    courseId: payment.course._id,
                    status: "active",
                    transactionId: payment._id,
                });
            }
        } else if (status === "rejected") {
            const sub = user.subscriptions?.find(
                (s) => s.courseId.toString() === payment.course._id.toString()
            );
            if (sub) {
                sub.status = "rejected";
            } else {
                user.subscriptions.push({
                    courseId: payment.course._id,
                    status: "rejected",
                    transactionId: payment._id,
                });
            }
        }

        await user.save();

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

        const transaction = await Payment.findById(transactionId)
            .populate("user")
            .populate("course");
        if (!transaction) return next(createError(404, "Transaction not found"));

        if (transaction.status !== "approved") {
            return next(
                createError(400, "Only approved subscriptions can be expired")
            );
        }

        transaction.status = "expired";
        await transaction.save();

        const sub = transaction.user.subscriptions?.find(
            (s) => s.courseId.toString() === transaction.course._id.toString()
        );
        if (sub) {
            sub.status = "expired";
        }
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
            .populate("course", "title price");  // 👈 include price

        // Counts
        const approvedCount = payments.filter((p) => p.status === "approved").length;
        const rejectedCount = payments.filter((p) => p.status === "rejected").length;
        const expiredCount = payments.filter((p) => p.status === "expired").length;

        // ✅ Revenue: sum actual course prices
        const revenue = payments.reduce((sum, p) => {
            if (p.status === "approved" || p.status === "expired") {
                return sum + (p.course?.price || 0);
            }
            return sum;
        }, 0);

        // ✅ Monthly sales: also count expired in the month they were created
        const monthlySalesRecord = Array(12).fill(0);
        payments.forEach((p) => {
            if (p.status === "approved" || p.status === "expired") {
                const month = new Date(p.createdAt).getMonth();
                monthlySalesRecord[month] += (p.course?.price || 0);  // sum revenue per month
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

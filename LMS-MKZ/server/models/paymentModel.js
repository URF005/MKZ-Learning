import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        receipt: {
            type: String, // Cloudinary URL
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "expired"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);

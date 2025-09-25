// U:\LMS-MKZ\server\models\transactionModel.js
import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    receiptUrl: { type: String, required: true }, // Cloudinary secure_url
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export default model("Transaction", transactionSchema);

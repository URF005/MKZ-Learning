import User from "../models/userModel.js";
import createError from "../utils/error.js";
import sendMail from "../utils/sendMail.js";

// 📩 Contact Us Controller
export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(createError(400, "All input fields are required"));
  }

  const subject = `📩 New message from ${name}`;
  const replySubject = `Thank you ${name} for contacting us`;

  const adminMessage = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
    </div>
  `;

  const replyMessage = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h3>Hello ${name},</h3>
      <p>Thank you for reaching out. Our support team will review your message and respond within <strong>24 hours</strong>.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>${process.env.FROM_NAME}</strong></p>
    </div>
  `;

  try {
    await sendMail(process.env.CONTACT_TO, subject, adminMessage);
    await sendMail(email, replySubject, replyMessage);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// 📊 User Stats Controller
// IMPORTANT: This assumes your User model uses `subscriptions: [{ courseId, status, transactionId }]`
export const userStats = async (req, res, next) => {
  try {
    const allUserCount = await User.countDocuments();

    // Users with at least one active subscription (per-course model)
    const subscribedCount = await User.countDocuments({
      subscriptions: { $elemMatch: { status: "active" } },
    });

    // If you want expired users too (optional, handy for charts)
    const expiredCount = await User.countDocuments({
      subscriptions: { $elemMatch: { status: "expired" } },
    });

    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      allUserCount,
      subscribedCount,   // ← unified key used by frontend
      expiredCount,      // ← optional; include if you want to use it
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

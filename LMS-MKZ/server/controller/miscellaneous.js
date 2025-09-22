import User from "../models/userModel.js";
import createError from "../utils/error.js";
import sendMail from "../utils/sendMail.js";

// 📩 Contact Us Controller
export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(createError(400, "All input fields are required"));
  }

  // subjects
  const subject = `📩 New message from ${name}`;
  const replySubject = `Thank you ${name} for contacting us`;

  // email body for admin
  const adminMessage = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
    </div>
  `;

  // auto-reply to user
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
    // send to admin/support
    await sendMail(process.env.CONTACT_TO, subject, adminMessage);

    // auto-reply to user
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
export const userStats = async (req, res, next) => {
  try {
    const allUserCount = await User.countDocuments();
    const subscribedUser = await User.countDocuments({
      "subscription.status": "active",
    });

    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      allUserCount,
      subscribedUser,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

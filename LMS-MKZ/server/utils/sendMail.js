import nodemailer from 'nodemailer';

const sendMail = async (toMail, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,                // e.g., smtp.gmail.com
        port: process.env.SMTP_PORT,                // 465 (SSL) or 587 (TLS)
        secure: process.env.SMTP_SECURE === 'true', // true if 465
        auth: {
            user: process.env.SMTP_USER,            // Gmail address
            pass: process.env.SMTP_PASS,            // App password
        },
    });

    const mailOptions = {
        from: `"${process.env.FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: toMail || process.env.CONTACT_TO,       // fallback if no receiver
        subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export default sendMail;

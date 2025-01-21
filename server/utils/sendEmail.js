import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Welcome to GenieAI!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
        <h1 style="color: #4CAF50; text-align: center;">Welcome to GenieAI! 🤖</h1>
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">
          We're thrilled to welcome you to GenieAI, where innovation meets simplicity! Thank you for joining our community. 
        </p>
        <p style="font-size: 16px; color: #333;">
          GenieAI is designed to help you tackle challenges, boost productivity, and unlock new opportunities. We're here to empower you on your journey!
        </p>
        <p style="font-size: 16px; color: #333;">Feel free to explore, ask questions, and make the most of what we have to offer.</p>
        <p style="font-size: 16px; color: #333;">If you have any questions, our team is always here to assist you.</p>
        <p style="font-size: 16px; color: #333;">Cheers,<br>The GenieAI Team</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;">
        <p style="font-size: 12px; color: #666; text-align: center;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

import nodemailer from "nodemailer";
import config from "../../config";

const sendEmail = async (receiverEmail: string, newPassword: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.app_email_address,
      pass: config.email_app_pass,
    },
  });

  const info = await transporter.sendMail({
    from: `"Techtong" <${config.app_email_address}>`,
    to: receiverEmail,
    subject: "Techtong - New Password",
    html: `<div style="background-color: #F5F5F5; width: 80%; padding: 40px; display: flex; direction: column; justify-content: center; align-items: center">
            <h1>Your new password is:</h1>
            <p style="font-size: 20px; font-weight: bold; background-color: #3352ff; padding: 10px; color: white; border-radius: 8px">${newPassword}</p>
        </div>`, // html body
  });
  console.log("Info....", info);
  console.log("Message sent: %s", info.messageId);
  return info;
};

export default sendEmail;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS,
  },
});

export const sendConfirmationEmail = (email, name, code) => {
  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: email,
    subject: "Registration confirmation on our site",
    html: `<p>Dear ${name},</p>
    <p>Thank you for registering on our site. you will find in this email your confirmation code which is used to validate your email address from your account on our site  :</p>
    ${code}
    <p>Sincerely,,</p>
    <p>Sunchine Villas' team</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("erreur pendant l'envoi du mail", error);
    } else {
      console.log("email envoyée avec success à ", email);
    }
  });
};

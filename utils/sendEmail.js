import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ali.missoum@3wa.io",
    pass: "rpyotuwieubvndnk",
  },
});

export const sendConfirmationEmail = (email, name, code) => {
  const mailOptions = {
    from: "ali.missoum@3wa.io",
    to: email,
    subject: "Confirmation d'inscrption sur notre site",
    html: `<p>Dear ${name},</p>
    <p>Thank you for registering on our site. Please click on the following link to confirm your registration :</p>
    <a href="https://alimissoum.app.3wa.io/user/confirmation/${code}">Confirm my registration</a>
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

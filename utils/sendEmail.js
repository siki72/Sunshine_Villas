import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ali.missoum@3wa.io",
    pass: "AdamAchillelilas",
  },
});

export const sendConfirmationEmail = (user) => {
  const mailOptions = {
    from: "ali.missoum@3wa.io",
    to: user.email,
    subject: "Confirmation d'inscrption sur notre site",
    html: `<p>Bonjour ${user.name},</p>
    <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien suivant pour confirmer votre inscription :</p>
    <a href="http://votresite.com/confirmation/${user.confirmationCode}">Confirmer mon inscription</a>
    <p>Cordialement,</p>
    <p>L'équipe de notre site</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("erreur pendant lenvoi du mail", error);
    } else {
      console.log("email envoye avec succes à ", user.email);
    }
  });
};

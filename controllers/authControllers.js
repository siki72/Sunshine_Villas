import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { createPoolConnexion } from "../config/db/connexion.js";
const maxAge = 3 * 24 * 60 * 60 * 1000;
import { sendConfirmationEmail } from "../utils/sendEmail.js";

// ------------------------------------------
//       Register new user
// ------------------------------------------

export const register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const confirmationCode = (
    Math.floor(Math.random() * 90000) + 10000
  ).toString();
  try {
    if (firstname && lastname && email && password) {
      const [user] = await createPoolConnexion().query(
        `SELECT email FROM users WHERE email = ?`,
        [email]
      );

      if (user.length > 0) {
        res
          .status(400)
          .json("Email already registered. Please log in instead.");
      } else {
        const hashedPassword = await argon2.hash(password);

        const [userRow] = await createPoolConnexion().query(
          `
          INSERT INTO users (firstname, lastname, email, password, confirmation_code) VALUES (?, ?, ?, ?, ?)
        `,
          [firstname, lastname, email, hashedPassword, confirmationCode]
        );
        res.status(200).json({
          id: userRow.insertId,
          firstname,
        });
        sendConfirmationEmail(email, firstname, confirmationCode);
      }
    }
  } catch (e) {
    res.status(422).json(e);
  }
};

// ------------------------------------------
//       login
// ------------------------------------------

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [user] = await createPoolConnexion().query(
      ` SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (user.length) {
      const validPass = await argon2.verify(user[0].password, password);
      if (validPass) {
        jwt.sign(
          {
            email: user[0].email,
            id: user[0].id,
            name: user[0].firstname,
            role: user[0].role,
            confirmed: user[0].confirmed,
          },
          process.env.TOKEN_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("karibu", token, {
                sameSite: "none",
                secure: true,
                maxAge: maxAge,
                httpOnly: true,
                domain: ".3wa.io",
              })
              .json({
                id: user[0].id,
                name: user[0].firstname,
                email: user[0].email,
                role: user[0].role,
                confirmed: user[0].confirmed,
              });
            res.status(200);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Logout
// ------------------------------------------
export const logout = async (req, res) => {
  res
    .status(202)
    .clearCookie("karibu", {
      sameSite: "none",
      secure: true,
      domain: ".3wa.io",
    })
    .send("cookie cleared");
};

// ------------------------------------------
//       register confirmation
// ------------------------------------------

export const confirmation = async (req, res, next) => {
  const { confirmationCode } = req.params;

  try {
    const [user] = await createPoolConnexion().query(
      `
      SELECT confirmed FROM users WHERE confirmation_code = ?
    `,
      [confirmationCode]
    );
    if (user.length > 0) {
      if (user[0].confirmed === 1) {
        res.status(204).json("votre email est déja confirmé");
      } else {
        await createPoolConnexion().query(
          `
        UPDATE users 
          SET confirmed = 1 WHERE confirmation_code = ?
      `,
          [confirmationCode]
        );
        res.status(202).json("votre inscription à été confirmée avec succés !");
      }
    } else {
      res.status(400).json("code de confirmation invalide.");
    }
  } catch (err) {
    next(err);
  }
};

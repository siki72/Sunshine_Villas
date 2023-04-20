import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { createPoolConnexion } from "../config/db/connexion.js";
const maxAge = 3 * 24 * 60 * 60 * 1000;

// ------------------------------------------
//       Register new user
// ------------------------------------------

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

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
          INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)
        `,
          [firstname, lastname, email, hashedPassword, "guest"]
        );
        res.status(200).json({
          id: userRow.insertId,
          firstname,
        });
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
    console.log(email);
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
              })
              .json({
                id: user[0].id,
                name: user[0].firstname,
                email: user[0].email,
                role: user[0].role,
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
    .clearCookie("karibu", { sameSite: "none", secure: true })
    .send("cookie cleared");
};

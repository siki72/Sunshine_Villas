import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createPoolConnexion } from "../config/db/connexion.js";
dotenv.config();

export const checkToken = (req, res, next) => {
  const token = req.cookies.karibu;

  if (!token) {
    return res.status(401).json("you are not authenticated!");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, userData) => {
    if (err) {
      return res.status(403).json("token is not valid");
    }

    const { id, email } = userData;
    const co = await createPoolConnexion();
    const [user] = await co.query(
      `SELECT email FROM users WHERE users.id = ?`,
      [id]
    );

    if (!user) {
      res.clearCookie("karibu", { sameSite: "none", secure: true });
      return res.status(401).json("you are not authenticated!");
    }

    next();
  });
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createPoolConnexion } from "../config/db/connexion.js";
dotenv.config();

export const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.karibu;
    if (!token) {
      return res.status(204).json("you are not authenticated!");
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, userData) => {
      if (err) {
        return res.status(403).json("token is not valid");
      }
      const { email } = userData;
      const co = await createPoolConnexion();
      const [user] = await co.query(
        `SELECT email FROM users WHERE users.email = ?`,
        [email]
      );
      if (!user.length) {
        res.clearCookie("karibu", {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        return res.status(401).json("invalid token");
      }
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const karibu = req.cookies.karibu;
    if (!karibu) {
      return res.status(401).json("you are not authenticated !!");
    }
    jwt.verify(karibu, process.env.TOKEN_SECRET, async (err, userData) => {
      if (err) {
        return res.status(403).json("token is not valid");
      }
      const { email, role } = userData;
      console.log(email, role);
      const co = await createPoolConnexion();
      const [admin] = await co.query(
        `SELECT email, role FROM users WHERE users.email = ?`,
        [email]
      );
      const userRole = admin[0].role;

      if (admin.length && userRole === "admin") {
        next();
      } else {
        return res.status(401).json("you are not logged as admin");
      }
    });
  } catch (err) {
    next(err);
  }
};

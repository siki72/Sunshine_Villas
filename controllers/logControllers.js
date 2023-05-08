import { createPoolConnexion } from "../config/db/connexion.js";

export const logRegister = async (req, res, next) => {
  try {
    const { url, message, user, stackTrace } = req.body;
    const co = await createPoolConnexion();
    const [error] = await co.query(
      `
            INSERT INTO errors_logs (url,message, user, stackTrace) VALUES (?,?,?,?)
        `,
      [url, message, user, stackTrace]
    );
    res.status(201).json("error handled");
  } catch (err) {
    next(err);
  }
};

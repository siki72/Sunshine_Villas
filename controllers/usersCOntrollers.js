import jwt from "jsonwebtoken";
import { createPoolConnexion } from "../config/db/connexion.js";
const maxAge = 3 * 24 * 60 * 60 * 1000;

// ------------------------------------------
//       Get user profile
// ------------------------------------------
export const getProfile = (req, res, next) => {
  try {
    const { karibu } = req.cookies; // ---> on récupére le cookie par le nom qu'on lui attribué
    if (karibu) {
      jwt.verify(
        karibu,
        process.env.TOKEN_SECRET,
        {},
        async (err, karibuData) => {
          if (err) throw err;
          const { name, email, id, role } = karibuData; // --> on récupére l'ID de notre utilisateur depuis le cookie qui ont été passé dans l'objet JWT
          res.status(200).json({ name, email, id, role });
        }
      );
    } else {
      res.status(204).json("you are not authentificated");
    }
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Get logged user datas
// ------------------------------------------
export const loggedUserDatas = async (req, res, next) => {
  try {
    const { karibu } = req.cookies;

    jwt.verify(
      karibu,
      process.env.TOKEN_SECRET,
      {},
      async (err, tokendatas) => {
        if (err) throw err;
        const { id } = tokendatas;

        const co = await createPoolConnexion();
        const [userInfos] = await co.query(
          ` SELECT
              firstname, lastname, email, phone, location
          
            FROM users WHERE users.id = ? `,
          [id]
        );
        res.status(200).json(userInfos);
      }
    );
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Update user datas
// ------------------------------------------

export const updateUserDatas = async (req, res, next) => {
  try {
    const { karibu } = req.cookies;
    jwt.verify(
      karibu,
      process.env.TOKEN_SECRET,
      {},
      async (err, tokendatas) => {
        if (err) throw err;
        const { id } = tokendatas;
        const { firstname, lastname, email, phone, location } = req.body;

        const co = await createPoolConnexion();
        const [updateRow] = await co.query(
          ` UPDATE users
        SET firstname = ?,
            lastname = ?,
            email = ?,
            phone =  ?,
            location = ? WHERE id = ?`,
          [firstname, lastname, email, phone, location, id]
        );
        res.status(202).json(updateRow);
      }
    );
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        reviews
// ------------------------------------------

export const reviewsDatas = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [table] = await co.query(`SELECT * FROM reveiws WHERE 1`);
    res.json(table);
  } catch (err) {
    next(err);
  }
};

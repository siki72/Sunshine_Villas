import jwt from "jsonwebtoken";
import { createPoolConnexion } from "../config/db/connexion.js";
import { sendConfirmationEmail } from "../utils/sendEmail.js";

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
          const [status] = await createPoolConnexion().query(
            `
            SELECT confirmed FROM users where id = ?
          `,
            [id]
          );
          const emailStatus = status[0].confirmed;
          res.status(200).json({ name, email, id, role, emailStatus });
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
              firstname, lastname, email, phone, location, confirmed,
              CASE WHEN confirmed = 0 THEN confirmation_code ELSE NULL END AS confirmation_code
          
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
    res.status(200).json(table);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        send confirmation email again
// ------------------------------------------

export const reSendMailCOnfirmation = async (req, res, next) => {
  try {
    const { email } = req.body;
    const co = await createPoolConnexion();
    const [user] = await co.query(
      `
      SELECT confirmation_code, firstname from users WHERE email = ?
    `,
      [email]
    );

    await sendConfirmationEmail(email, user.firstname, user.confirmation_code);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        verify validation code from user account
// ------------------------------------------

export const checkConfirmationCode = async (req, res, next) => {
  try {
    const validationCode = req.body.code;
    const co = await createPoolConnexion();
    const [validate] = await co.query(
      `
      SELECT confirmation_code FROM users WHERE confirmation_code =?
    `,
      [validationCode]
    );
    if (validate.length > 0) {
      await co.query(
        `
        UPDATE users 
          SET confirmed = 1 
          WHERE users.confirmation_code =?
      `,
        [validationCode]
      );
      res.status(200).json("code ok");
    } else {
      res.status(404).json("invalid confirmation code");
    }
  } catch (err) {
    next(err);
  }
};

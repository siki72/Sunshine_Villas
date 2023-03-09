import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createPoolConnexion } from "./config/db/connexion.js";
import argon2 from "argon2";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
/*app.use(
  
    cors({
      credentials: true,
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],

      
    })
  );

/****** GET **** */
app.get("/cards", async (req, res) => {
  const co = await createPoolConnexion();
  const [table] = await co.query(`SELECT * FROM cards WHERE 1`);
  res.json(table);
});

app.get("/reveiws", async (req, res) => {
  const co = await createPoolConnexion();
  const [table] = await co.query(`SELECT * FROM reveiws WHERE 1`);
  res.json(table);
});

/****** post  new user *********/

app.post("/register", bodyParser.json(), async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    if (firstname && lastname && email && password) {
      const [user] = await createPoolConnexion().query(
        `SELECT email FROM users WHERE email = ?`,
        [email]
      );

      if (!user.length) {
        const hashedPassword = await argon2.hash(password);

        const [userRow] = await createPoolConnexion().query(
          `
          INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)
        `,
          [firstname, lastname, email, hashedPassword]
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
});

app.post("/login", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const [user] = await createPoolConnexion().query(
      ` SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (user) {
      const validPass = await argon2.verify(user[0].password, password);

      if (validPass) {
        jwt.sign(
          { email: user[0].email, id: user[0].id },
          process.env.TOKEN_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("karibu", token, { sameSite: "none", secure: true })
              .json({ id: user[0].id, name: user[0].firstname });
            res.status(200);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("notfound");
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

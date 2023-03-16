import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createPoolConnexion } from "./config/db/connexion.js";
import argon2 from "argon2";
import { checkToken } from "./utils/chekToken.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const maxAge = 3 * 24 * 60 * 60 * 1000;

// CORS
/*  app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.status(200);
  } else {
    next();
  }
});*/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

/* ************** GET profile **************/

app.get("/profile", checkToken, (req, res, next) => {
  try {
    const { karibu } = req.cookies; // ---> on récupére le cookie par le nom qu'on lui attribué
    if (karibu) {
      jwt.verify(
        karibu,
        process.env.TOKEN_SECRET,
        {},
        async (err, karibuData) => {
          if (err) throw err;
          const { name, email, id } = karibuData; // --> on récupére l'ID de notre utilisateur depuis le cookie qui ont été passé dans l'objet JWT
          res.status(200).json({ name, email, id });
        }
      );
    } else {
      res.status(404).json("you are not authentificated");
    }
  } catch (err) {
    next(err);
  }
});

/****** GET  all villas for card components  *****/
app.get("/villas", async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [table] = await co.query(`SELECT * FROM villas WHERE 1`);
    res.json(table);
  } catch (err) {
    next(err);
  }
});

/***** GET REVIEWS ****/
app.get("/reviews", async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [table] = await co.query(`SELECT * FROM reveiws WHERE 1`);
    res.json(table);
  } catch (err) {
    next(err);
  }
});

/****** get  villa by id *********/

app.get("/villas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(typeof id);
    if (typeof id === "number") {
      const co = await createPoolConnexion();
      const [villa_row] = await co.query(`SELECT * FROM villas WHERE id = ? `, [
        id,
      ]);

      res.status(200).json(villa_row[0]);
    }
  } catch (e) {
    res.status(400).json("Bad Request or error id villa");
  }
});

/****** add a booking *********/
app.post("/booking", checkToken, async (req, res, next) => {
  try {
    const { checkIn, checkOut, villaId, userId, nights, total, selectedDates } =
      req.body;
    const co = await createPoolConnexion();
    const [reservation] = await co.query(
      ` INSERT INTO reservations (guest_id, villa_id, start_date, end_date, nights, total_price, selected_dates) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [userId, villaId, checkIn, checkOut, nights, total, selectedDates]
    );
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
});

/****** Get / bookings  *********/

app.get("/bookings", checkToken, async (req, res, next) => {
  try {
    const { karibu } = req.cookies;
    jwt.verify(
      karibu,
      process.env.TOKEN_SECRET,
      {},
      async (err, myTokenData) => {
        if (err) throw err;
        const { id } = myTokenData;
        const co = await createPoolConnexion();
        const [myBbookings] = await co.query(
          `SELECT
    firstname, lastname, name, url,start_date, end_date, total_price, reservations.created_at, reservations.nights, villas.id
     FROM reservations
     INNER JOIN users ON reservations.guest_id = users.id 
     INNER JOIN villas ON reservations.villa_id = villas.id 
     WHERE guest_id = ?`,
          [id]
        );
        res.json(myBbookings);
      }
    );
  } catch (err) {
    next(err);
  }
});

/****** POST  NEW USER *********/

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
          INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)
        `,
          [firstname, lastname, email, hashedPassword, "guest"]
        );
        res.status(200).json({
          id: userRow.insertId,
          firstname,
        });
      }
    } else {
      res.status(400).json("data deficiencies");
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

/******* LOGIN ******/

app.post("/login", bodyParser.json(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [user] = await createPoolConnexion().query(
      ` SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (user) {
      const validPass = await argon2.verify(user[0].password, password);

      if (validPass) {
        jwt.sign(
          { email: user[0].email, id: user[0].id, name: user[0].firstname },
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
              .json({ id: user[0].id, name: user[0].firstname });
            res.status(200);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found");
    }
  } catch (err) {
    next(err);
  }
});

/******* logout ******/

app.get("/logout", (req, res) => {
  res
    .status(202)
    .clearCookie("karibu", { sameSite: "none", secure: true })
    .send("cookie cleared");
});

/********************  Get availables dates on run for each villa********************/

app.post("/availableDates", async (req, res) => {
  const { idVilla } = req.body;
  console.log(idVilla);
  const co = await createPoolConnexion();

  const [gresyCases] = await co.query(
    `SELECT selected_dates FROM reservations WHERE villa_id = ?`,
    [idVilla]
  );
  res.json(gresyCases);
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({ message: "internal server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

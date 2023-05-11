import { createPoolConnexion } from "../config/db/connexion.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);
// ------------------------------------------
//       GET  all villas datas to implement the Store.
// ------------------------------------------

export const getAllVillasDatas = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [table] = await co.query(`SELECT * FROM villas WHERE 1`);
    res.json(table);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Get villas datas by id
// ------------------------------------------

export const getVillasDataById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

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
};
// ------------------------------------------
//       New booking
// ------------------------------------------

export const newBooking = async (req, res, next) => {
  try {
    const {
      slug,
      checkIn,
      checkOut,
      villaId,
      userId,
      nights,
      total,
      selectedDates,
    } = req.body;
    const co = await createPoolConnexion();
    const [villaImg] = await co.query(
      ` SELECT url, infos FROM villas WHERE id = ?`,
      [villaId]
    );

    // create payement sessions
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "villas " + slug,
              images: [villaImg[0].url],
              description: villaImg[0].infos,
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-succes`,
      cancel_url: `${process.env.CLIENT_URL}/villas/${slug}/${villaId}`,
      // save all bokking data of our guest in metadata to implement db one payement success
      metadata: {
        checkIn,
        checkOut,
        villaId,
        userId,
        nights,
        total,
        selectedDates,
      },
    });
    res.status(200).send({ url: session.url });
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Get all user reservations
// ------------------------------------------

export const allUserBookings = async (req, res, next) => {
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
     WHERE guest_id = ?
     ORDER BY reservations.created_at DESC`,
          [id]
        );
        res.status(200).json(myBbookings);
      }
    );
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//       Display only available dates
// ------------------------------------------

export const availableDates = async (req, res) => {
  const { idVilla } = req.body;

  const co = await createPoolConnexion();

  const [gresyCases] = await co.query(
    `SELECT selected_dates FROM reservations WHERE villa_id = ?`,
    [idVilla]
  );
  res.json(gresyCases);
};

// ------------------------------------------
//       payment of the booking && implement DB
// ------------------------------------------

export const payment = async (req, res, next) => {
  try {
    const { metadata, payment_status } = req.body.data.object;
    const { checkIn, checkOut, villaId, userId, nights, total, selectedDates } =
      metadata;
    if (payment_status === "paid") {
      const co = await createPoolConnexion();
      const [reservation] = await co.query(
        ` INSERT INTO reservations (guest_id, villa_id, start_date, end_date, nights, total_price, selected_dates) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [userId, villaId, checkIn, checkOut, nights, total, selectedDates]
      );
      const [price] = await co.query(
        `SELECT profits FROM users WHERE id = ? FOR UPDATE`,
        [userId]
      );
      const newTotal = parseInt(price[0].profits) + parseInt(total);
      await co.query(`UPDATE users SET profits = ? WHERE id = ?`, [
        newTotal,
        userId,
      ]);

      const [user] = await co.query(
        `SELECT reservations_count FROM users WHERE id = ? FOR UPDATE`,
        [userId]
      );
      const reservationsCount = user[0].reservations_count + 1;
      // update count of reservations
      await co.query(`UPDATE users SET reservations_count = ? WHERE id = ?`, [
        reservationsCount,
        userId,
      ]);
      res.status(201).json("payement successful");
    } else {
      res.status(200).json("payement failded");
    }
  } catch (err) {
    next(err);
  }
};

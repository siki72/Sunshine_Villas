import { createPoolConnexion } from "../config/db/connexion.js";

// ------------------------------------------
//  Datas of villas for dashboard by villa id
// ------------------------------------------

export const villasBookingsById = async (req, res, next) => {
  try {
    const { id } = req.body;
    const co = await createPoolConnexion();
    const [myDatas] = await co.query(
      `SELECT
   reservations.id, firstname, email, lastname,start_date, end_date, total_price, reservations.created_at, reservations.nights
     FROM reservations
     INNER JOIN users ON reservations.guest_id = users.id 
     INNER JOIN villas ON reservations.villa_id = villas.id 
     WHERE villa_id = ?  ORDER BY start_date ASC`,
      [id]
    );
    res.status(200).json(myDatas);
  } catch (err) {
    next(err);
  }
};
// ------------------------------------------
//        delete reservation by id
// ------------------------------------------

export const deleteBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const co = await createPoolConnexion();
    const [deletedRow] = await co.query(
      `DELETE FROM reservations WHERE reservations.id = ?`,
      [id]
    );
    res.status(200).json(deletedRow);
  } catch (err) {
    next(err);
  }
};
// ------------------------------------------
//        Get total price of reservation of the day
// ------------------------------------------

export const profitBookingsDay = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [myWidgets] = await co.query(`
        SELECT
        total_price FROM reservations WHERE DATE(created_at) = DATE(NOW())
    `);
    res.status(200).json(myWidgets);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Post new reservation for walima restaurent
// ------------------------------------------

export const newWalimaReservation = async (req, res, next) => {
  const { name, email, date, guests } = req.body;

  try {
    const co = await createPoolConnexion();
    const [table] = await co.query(
      `
            INSERT INTO walima (name, email, guests, date) VALUES (?,?,?,?)
        `,
      [name, email, guests, date]
    );
    res.status(201).json(table);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Get walima's reservation of the day
// ------------------------------------------

export const walimaReservations = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [reservation] = await co.query(`
        SELECT
        * FROM walima WHERE date = CURDATE()
    `);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Get all reservations date
// ------------------------------------------

export const allBookingsDates = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [bookedDates] = await co.query(
      `SELECT selected_dates FROM reservations WHERE 1`
    );
    res.status(200).json(bookedDates);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Get all users on DB
// ------------------------------------------

export const gelAllUsers = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [usersRows] = await co.query(
      `SELECT id, firstname, lastname, email, role, phone, location, confirmed,reservations_count, profits FROM users WHERE 1/*users.role = "guest"*/`
    );
    res.status(200).json(usersRows);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Delete user by id
// ------------------------------------------

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const co = await createPoolConnexion();
    const [deletedRow] = await co.query(
      `DELETE FROM users WHERE users.id = ?`,
      [id]
    );
    res.status(200).json(deletedRow);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Update user role
// ------------------------------------------

export const updateUserRole = async (req, res, next) => {
  const { id, role } = req.body;

  try {
    const co = await createPoolConnexion();
    const [updateRole] = await co.query(
      `UPDATE users SET role = ? WHERE id = ?`,
      [role, id]
    );
    res.status(200).json(updateRole);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Update villas data
// ------------------------------------------

export const updateVillasDatas = async (req, res, next) => {
  const { id, name, price, infos, url } = req.body;
  try {
    const co = await createPoolConnexion();
    const [updateVilla] = await co.query(
      ` 
      UPDATE villas
        SET name = ? ,
            price = ?,
            infos = ?,
            url = ? 
        WHERE villas.id = ?    
    `,
      [name, price, infos, url, id]
    );
    res.status(200).json(updateVilla);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Get All Bookings villas data
// ------------------------------------------

export const getAllBookings = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [bookings] = await co.query(`
      SELECT villa_id FROM reservations
    `);
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------
//        Get profits booking of the week
// ------------------------------------------

export const getProfits = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();

    const [weekProfits] = await co.query(`
      SELECT DATE(created_at) as day, SUM(total_price) as profit
      FROM reservations
      WHERE created_at >= DATE(NOW()) - INTERVAL 7 DAY
      GROUP BY day 
    `);
    res.status(200).json(weekProfits);
  } catch (err) {
    next(err);
  }
};
// ------------------------------------------
//        Get Users Locations
// ------------------------------------------

export const getUsersLocations = async (req, res, next) => {
  try {
    const co = await createPoolConnexion();
    const [locations] = await co.query(`
      SELECT location FROM users 
      WHERE location IS NOT NULL
    `);
    res.status(200).json(locations);
  } catch (err) {
    next(err);
  }
};

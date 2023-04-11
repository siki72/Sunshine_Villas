import { createPoolConnexion } from "../config/db/connexion.js";
// ------------------------------------------
//  Datas of villas for dashboard by villa id
// ------------------------------------------

export const villasBookingsById = async (req, res, next) => {
  try {
    const { id } = req.body;
    /*AND start_date >= DATE(NOW() - INTERVAL 1 DAY)*/
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
        total_price FROM reservations WHERE DATE(start_date) = DATE(NOW() - INTERVAL 1 DAY)
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
      `SELECT id, firstname, lastname, email, role, phone, location, reservations_count, profits FROM users WHERE 1/*users.role = "guest"*/`
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
  console.log(id, role);
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

import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
import { checkToken } from "../chekToken.js";
import {
  villasBookingsById,
  deleteBookingById,
  profitBookingsDay,
  newWalimaReservation,
  walimaReservations,
  allBookingsDates,
  gelAllUsers,
  deleteUserById,
  updateUserRole,
} from "../../controllers/adminControllers.js";

router.post("/data", villasBookingsById);
router.delete("/bookings/:id", deleteBookingById);
router.get("/widgets", profitBookingsDay);
router.post("/walima", newWalimaReservation);
router.get("/walima", walimaReservations);
router.get("/datas/villas", allBookingsDates);
router.get("/users", gelAllUsers);
router.delete("/users/:id", bodyParser.json(), checkToken, deleteUserById);
router.put("/users/role", checkToken, updateUserRole);

export default router;

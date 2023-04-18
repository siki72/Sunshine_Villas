import express from "express";
const router = express.Router();
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
import { isAdmin } from "../chekToken.js";

router.post("/data", villasBookingsById);
router.delete("/bookings/:id", isAdmin, deleteBookingById);
router.get("/widgets", profitBookingsDay);
router.post("/walima", newWalimaReservation);
router.get("/walima", walimaReservations);
router.get("/datas/villas", allBookingsDates);
router.get("/users", gelAllUsers);
router.delete("/users/:id", isAdmin, deleteUserById);
router.put("/users/role", isAdmin, updateUserRole);

export default router;

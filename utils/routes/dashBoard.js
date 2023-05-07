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
  updateVillasDatas,
  getAllBookings,
  getProfits,
  getUsersLocations,
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
router.put("/datas/villas", isAdmin, updateVillasDatas);
router.get("/villas/bookings", isAdmin, getAllBookings);
router.get("/villas/profit", getProfits);
router.get("/users/locations", getUsersLocations);

export default router;

import express from "express";
const router = express.Router();
import { checkToken } from "../chekToken.js";
import {
  getAllVillasDatas,
  getVillasDataById,
  newBooking,
  allUserBookings,
  availableDates,
} from "../../controllers/villasControllers.js";

router.get("/villas", getAllVillasDatas);
router.get("/villa/:id", getVillasDataById);
router.post("/booking", checkToken, newBooking);
router.get("/user/myBookings", checkToken, allUserBookings);
router.post("/villas/availableDates", availableDates);
export default router;

import express from "express";
const router = express.Router();
import { logRegister } from "../../controllers/logControllers.js";

router.post("/log", logRegister);

export default router;

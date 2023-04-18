import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { checkToken } from "../chekToken.js";
import { logout, login, register } from "../../controllers/authControllers.js";
import {
  getProfile,
  loggedUserDatas,
  updateUserDatas,
  reviewsDatas,
} from "../../controllers/usersControllers.js";
dotenv.config();

// ------------------------------------------
//       Authentification
// ------------------------------------------
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// ------------------------------------------
//       Users datas
// ------------------------------------------
router.get("/profile", getProfile);
router.get("/user", loggedUserDatas);
router.post("/update", checkToken, updateUserDatas);
router.get("/reviews", reviewsDatas);

export default router;

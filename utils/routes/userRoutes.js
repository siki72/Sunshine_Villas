import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { checkToken } from "../chekToken.js";
import {
  logout,
  login,
  register,
  confirmation,
} from "../../controllers/authControllers.js";
import {
  getProfile,
  loggedUserDatas,
  updateUserDatas,
  reviewsDatas,
  reSendMailCOnfirmation,
  checkConfirmationCode,
} from "../../controllers/usersControllers.js";
dotenv.config();

// ------------------------------------------
//       Authentification
// ------------------------------------------
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/confirmation/:confirmationCode", confirmation);

// ------------------------------------------
//       Users datas
// ------------------------------------------
router.get("/profile", checkToken, getProfile);
router.get("/user", checkToken, loggedUserDatas);
router.post("/update", checkToken, updateUserDatas);
router.post("/email", checkToken, reSendMailCOnfirmation);
router.post("/validation", checkToken, checkConfirmationCode);
router.get("/reviews", reviewsDatas);

export default router;

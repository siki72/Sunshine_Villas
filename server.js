import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./utils/routes/userRoutes.js";
import adminDatas from "./utils/routes/dashBoard.js";
import villasRoutes from "./utils/routes/villasRoutes.js";
import log from "./utils/routes/log.js";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});
app.use(morgan("tiny"));
app.use("/user", userRoutes);

app.use("/admin", adminDatas);

app.use("/villas", villasRoutes);

app.use("/api", log);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "internal server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

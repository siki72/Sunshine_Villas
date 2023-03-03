import express  from "express";
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser";
import { createPoolConnexion } from "./config/db/connexion.js";

dotenv.config()
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );


  app.get("/cards", async (req, res) => {
    const co = await createPoolConnexion()
    const [table] = await co.query(`SELECT * FROM cards WHERE 1`)
    res.json(table)
  })
  


const PORT= process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})
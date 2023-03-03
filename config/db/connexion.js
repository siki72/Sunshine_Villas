import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config()

const options = {
    user : "alimissoum",
    password : "d9ab2d329f20d9c9d8161b2253ff38ca",
    host : "db.3wa.io",
    database: "alimissoum_booking"
}


export function createConnexion(){
    return mysql.createConnection(options)
}


let pool = null

export function createPoolConnexion() {
    if(pool) return pool
    pool = mysql.createPool(options)
    return pool
}
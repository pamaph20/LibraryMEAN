"use strict"
import express from "express"
import cors from "cors"
import bookRouter from "./routes/books.mjs"
import userRouter from "./routes/users.mjs"
import { MongoClient } from "mongodb";
import Dotenv from "dotenv";

Dotenv.config();



 export function getDb(){
  const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
  return new MongoClient(url);
}
/***
 * This is separate, but it works
 */
await getDb().connect()
console.log("DB Connected")

const app = express();
app.use(cors());
app.use(express.json());

app.get("", (req,res) => {
  res.send("Invalid Endpoint")
})

app.use('/books', bookRouter)
app.use('/user', userRouter)
export default app;


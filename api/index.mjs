"use strict"
import {MongoClient} from "mongodb"
import express from "express"
import cors from "cors"
import bookRouter from "./routes/books.mjs"
import userRouter from "./routes/users.mjs"
import libraryRouter from "./routes/libraries.mjs"
//import {client} from "./db.mjs"
import Dotenv from "dotenv";


Dotenv.config();
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
await client.connect();
console.log("DB Connected")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
  res.send("Invalid Endpoint")
})

app.use('/books', bookRouter)
app.use('/user', userRouter)
app.use('/library', libraryRouter)
export default app;


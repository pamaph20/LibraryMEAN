"use strict"
import { check_user } from "../controllers/user.mjs";
import { getData } from "../controllers/books.mjs";
import express from "express";
import Dotenv from "dotenv";
import { MongoClient } from "mongodb";
//This is Redundant ----Figure out how to share client with everything
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);

//This is Redundant ----
let UserCol = client.db("LibraryDB").collection("User");
const router = express.Router()



export default router;
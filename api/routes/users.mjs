"use strict"
import { check_user } from "../controllers/user.mjs";
import { getLibraryData } from "../controllers/library.mjs";
import express from "express";
import Dotenv from "dotenv";
import { MongoClient } from "mongodb";
//This is Redundant ----Figure out how to share client with everything
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);

//This is Redundant ----
let UserCol = client.db("LibraryDB").collection("User");
let LibCol = client.db("LibraryDB").collection("Library");

const router = express.Router()
router.get("/search/:user_id", async (req,res) =>{
    /***
     * Returns json library information based on a give user_id 
     */
    let user_id = req.params.user_id;
    if(await check_user(user_id) == 0){
      res.status(401)
      res.json(`User ${user_id} does not exist`)
    }
    try{
      res.json(await getLibraryData(user_id))
    }catch(error){
      console.error(error.message);
    }
  });
export default router;
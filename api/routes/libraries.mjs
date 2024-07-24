"use strict"

import { check_user } from "../controllers/user.mjs";
import { getLibraryData, check_lib } from "../controllers/library.mjs";
import express from "express";
import Dotenv from "dotenv";
import { MongoClient } from "mongodb";
//This is Redundant ----Figure out how to share client with everything
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);

//This is Redundant ----
let LibCol = client.db("LibraryDB").collection("Library");

const router = express.Router()
router.get("/search/:library_id", async (req,res) =>{
    /***
     * Returns json library information based on a give user_id 
     */
    let user_id = req.params.library_id;
    if(await check_lib(user_id) == 0){
      res.status(401)
      res.json(`User ${user_id} does not exist`)
    }
    try{
      res.json(await getLibraryData(user_id))
    }catch(error){
      console.error(error.message);
    }
  });

  router.put("/add_book/:library_id/:id", async (req, res) => {
    //needs to be some user authentication here... probably with session information 
    /**
     * Add new book to a users library where id is a general book identifier
     */
    const book_id = req.params.id;
    const library_id = req.params.library_id; 
    if(await check_lib(library_id) == 0){
      res.status(401)
      res.json(`Library ${library_id} does not exist, please make a ${library_id} library`)
    }
    //get the users library
    let library = await LibCol.find({
        LibraryName : library_id
      }).toArray();
    try{
        //update the given library array with the new book.
        library[0]["Books"].push(book_id.toString()); 
      await LibCol.updateOne(
        {"LibraryName" : library_id},
        {$set : {"Books" : library[0]["Books"]}}
      );
      res.json({})
      res.status(200)
    }catch (error) {
      console.error(error.message);
    }
  });
export default router;
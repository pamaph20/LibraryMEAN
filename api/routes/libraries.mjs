"use strict"

import { check_user } from "../controllers/user.mjs";
import { getLibraryData, check_lib, get_books_list } from "../controllers/library.mjs";
import express from "express";
import Dotenv from "dotenv";
import { MongoClient } from "mongodb";
import library from "../models/library.mjs";
import { exit } from "process";
import { getData, getMultBooks } from "../controllers/books.mjs";
//This is Redundant ----Figure out how to share client with everything
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);

//This is Redundant ----
let LibCol = client.db("LibraryDB").collection("Library");

const router = express.Router()
router.get("/search/:library_name/:user_id", async (req,res) =>{
    /***
     * Returns json library information based on a given library id
     * need to check both user id and library name 
     */
    let library_name = req.params.library_name;
    let user_id = req.params.user_id;
    let check = await check_user(user_id);
    if(check === false){
      res.status(401);
      res.json(`User ${user_id} does not exis`);
      exit;
    }
    // why is this try still going.. maybe understand try catches better. 
    try{
      res.json(await getLibraryData(library_name, user_id))
    }catch(error){
      console.error(error.message);
    }
  });

  router.put("/add_book/:library_id/:olid/:user_id", async (req, res) => {
    //needs to be some user authentication here... probably with session information 
    /**
     * Add new book to a users library where id is a general book identifier
     */
    const olid = req.params.olid;
    const library_id = req.params.library_id; 
    const user_id = req.params.user_id;
    if(await !check_lib(library_id)){
      res.status(401)
      res.json(`Library ${library_id} does not exist, please make a ${library_id} library`)
    }
    if(await !check_user(user_id)){
      res.status(401)
      res.json(`Library ${library_id} does not exist, please make a ${library_id} library`)
    }
    //get the users library
    let library = await LibCol.find({
        LibraryName : library_id,
        User_id : user_id
      }).toArray();
    try{
        //update the given library array with the new book.
        if(!library[0]["Books"].includes(olid)){
          //if the book doesnt already exist
          library[0]["Books"].push(olid.toString()); 
          await LibCol.updateOne(
            {"LibraryName" : library_id,
              "User_id" : user_id
            },
            {$set : {"Books" : library[0]["Books"]}}
          );
        }
      res.json({})
      res.status(200)
    }catch (error) {
      console.error(error.message);
    }
  });


  
router.put("/remove/:library_id/:u_id/:olid", async (req,res) => {
  //since im not working with sessions im doing this the hard way...
  /**
   * Removes a book from the current users library
   */
  let u_id = req.params.u_id;
  let lib_id = req.params.library_id;
  let olid = req.params.olid;
  let books = await get_books_list(lib_id, u_id);
  let updated_books = books.filter(function(element) {
    return element !== olid
  })
  try{
    await LibCol.updateOne(
      {"LibraryName" : lib_id,
        "User_id" : u_id
      },
      {$set : {"Books" :  updated_books}}
    );
  }catch(error){
    console.log(error)
  }
  res.json({})
  res.status(200);
});
router.post("/add_Library/:libName/:user_id", async (req,res)=> {
  /**
   * Endpoint to add a new library!
   */
  const library_name = req.params.libName;
  const user_id = req.params.user_id;
  if(!check_user(user_id)){
    //User dne
    res.json(`Usr ${user_id} does not exist`);
    res.status(402);
  }
  library.Books = [];
  library.LibraryName = library_name;
  library.User_id = user_id
  try{
    await LibCol.insertOne(library);
    res.json({})
    res.status(200)
  }catch (error) {
    console.error(error.message);
  }
});



router.get("", async (req,res) => {
  /**
   * Gets all the books in db 
   */
  const uniqueBooks = await LibCol.aggregate([
    { $unwind: '$Books' }, // Deconstruct the Books array
    { $group: { _id: '$Books', count: { $sum: 1 } } }, // Group by book title and count occurrences
    { $project: { _id: 0, book: '$_id' } } // Project only the book title
  ]).toArray();
  const olids = uniqueBooks.map(doc => doc.book);
  let data = await getMultBooks(olids);
  res.send(data)
})
export default router;


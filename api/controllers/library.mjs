"use strict"
import { MongoClient } from "mongodb";
import { getData } from "./books.mjs";
import Dotenv from "dotenv";
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
let LibCol = client.db("LibraryDB").collection("Library");

export async function getLibraryData(library_id){
    /**
     * Takes a library array of book ids and returns more info on each 
     * This seems realllllly slow.... O(n)
     */
    let cur = await LibCol.find({
        LibraryName : library_id
      }).toArray();
      //gets the list of books in library
      let books = cur[0]["Books"]
    let res = [];
    for (const book_id of books) {
      const data = await getData(book_id);
      res.push(data);
    }
    return res;
  }

  export async function check_lib(library_id){
    //Check to see the user exists
    let user = await LibCol.findOne({"LibraryName" : `${library_id}`});
    if(user === null){
      //user doesnt exist
      return 0
    }
    //user exists
    return 1
  }
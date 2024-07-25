"use strict"
import { MongoClient } from "mongodb";
import { getMultBooks } from "./books.mjs";
import Dotenv from "dotenv";
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
let LibCol = client.db("LibraryDB").collection("Library");

export async function getLibraryData(library_name, user){
    /**
     * Takes a library array of book ids and returns more info on each 
     * This seems realllllly slow.... O(n)
     */
    let cur = await LibCol.find({
        LibraryName : library_name,
        User_id : user
      }).toArray();
    if(cur.length == 0){
      //this means that user has no library of that name this works if cur is empty. 
      return `${library_name} was not found under user ${user}`
    }
      //gets the list of books in library
    let books = cur[0]["Books"];
    let data = await getMultBooks(books);
    return data;
  }

  export async function check_lib(library_id){
    //Check to see the library exists
    let lib = await LibCol.findOne({"LibraryName" : `${library_id}`});
    if(lib === null){
      //library doesnt exist
      return false
    }
    //library exists
    return true
  }
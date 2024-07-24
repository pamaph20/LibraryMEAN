"use strict"
import { MongoClient } from "mongodb";
import { getData } from "./books.mjs";
import Dotenv from "dotenv";
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
let LibCol = client.db("LibraryDB").collection("Library");

export async function getLibraryData(user_id){
    /**
     * Takes a library array of book ids and returns more info on each 
     * This seems realllllly slow.... O(n)
     */
    let cur = await LibCol.find({
        user_id : user_id
      }).toArray();
      //gets the list of books in library
      let books = cur[0]["Books"]
    let res = [];
    for (const element of books) {
      const search_uri = `https://openlibrary.org/search.json?q=${element}`;
      const data = await getData(search_uri);
      res.push(data);
    }
    return res;
  }
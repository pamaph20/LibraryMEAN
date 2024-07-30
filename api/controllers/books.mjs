"use strict"
import { Int32 } from "mongodb";
import { MongoClient } from "mongodb";
import { setBook } from "../models/book.mjs";
import Dotenv from "dotenv";
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
let LibCol = client.db("LibraryDB").collection("Library");
let booksCol = client.db("LibraryDB").collection("Book");
export async function getData(olid) {
    /***
     * Get a books title, author, and ISBN based on OLId
     * FIXME : Needs to search off of the name of the book evbentaully not the olid.. 
     */
    
    try {
      const search_uri = `https://openlibrary.org/search.json?q=${olid}`;
      const search_response = await fetch(search_uri);
      if (!search_response.ok) {
        throw new Error(`Response status: ${search_response.status}`);
      }
      const search_data = await search_response.json();
      return setBook(
        search_data.docs[0].author_name, 
        search_data.docs[0].isbn[0],
        `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`,
        search_data.docs[0].title,
        olid
      );
    } catch (error) {
      console.error(error.message);
    }
  }
export async function getMultBooks(olids){
  /**
   * Given an array of olids return an array of all the book data
   */
  let data = [];
  for (const olid of olids) {
    const book = await check_in_mongo(olid);
    data.unshift(book);
  }
  return data;
}
 
  
export async function check_in_mongo(olid){
  //if the book is not in books array already, add it for future use
  let cur = await booksCol.find({
    OLID : olid
  });
  if(cur == null){
    //does not exist, therefore add it to mongo
    booksCol.insertOne(await getData(olid))
  }
  //if wasnt in mongo should now be
  let data =  await booksCol.findOne({
    OLID : olid
  });
  return data;
}




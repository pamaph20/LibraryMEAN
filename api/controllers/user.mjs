//Figure out client sharing
import { MongoClient } from "mongodb";
import { getData } from "./books.mjs";
import Dotenv from "dotenv";
Dotenv.config()
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_Password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
let client =  new MongoClient(url);
let col = client.db("LibraryDB").collection("User");
"use strict"
export async function check_user(id){
    //Check to see the user exists
    let user = await col.findOne({"user_id" : `${id}`});
    if(user === null){
      //user doesnt exist
      return 0
    }
    //user exists
    return 1
  }




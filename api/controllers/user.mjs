//Figure out client sharing
import { MongoClient } from "mongodb";
import { getDb } from "../index.mjs";
"use strict"
const client = getDb()
export async function check_user(id){
    //Check to see the user exists
    let col = client.db("LibraryDB").collection("User");
    let user = await col.findOne({"user_id" : `${id}`});
    if(user === null){
      //user doesnt exist
      return 0
    }
    //user exists
    return 1
  }
  
//Figure out client sharing
import { MongoClient } from "mongodb";
"use strict"
const url = `mongodb+srv://dmaphey:${process.env.DB_password}@libcluster.e6dnhcx.mongodb.net/?retryWrites=true&w=majority&appName=LibCluster`
const cli = new MongoClient(url);
export async function check_user(id){
    //Check to see the user exists
    let col = cli.db("LibraryDB").collection("User");
    let user = await col.findOne({"user_id" : `${id}`});
    if(user === null){
      //user doesnt exist
      return 0
    }
    //user exists
    return 1
  }
  
//Figure out client sharing
import { MongoClient } from "mongodb";
import { getData } from "./books.mjs";
import { argon2id } from "argon2";
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
      return false
    }
    //user exists
    return true
  }
  export async function hashPassword(password) {
    try {
      const hash = await argon2id.hash(password);
      console.log("Hashed Password:", hash);
      return hash;
    } catch (err) {
      console.error(err);
    }
  }

  export async function validatePassword(password, hash){
    try {
      if (await argon2id.verify(hash, password)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function findUsername(username){
    //Check to see the user exists
    let user = await col.findOne({"username" : `${username}`});
    if(user === null){
      //user doesnt exist
      return false
    }
    //user exists
    return true
  }

  export async function createUser(username, email, password){
    //first I need to check to make sure the user doesnt exist
    if(await findUsername(username)){
      //the user exists 
      return false
    }
    await col.insertOne({
      "user_id" : await col.countDocuments({}) + 1,
      "email" : email,
      "password" : await hashPassword(password),
      "username" : username
    });
    return true; 
  }
  export async function getReadBooks(userId){
    let readbooks = await col.findOne({
      "user_id":userId
    });
    return readbooks["booksRead"];
  }
  export async function readBook(user_id, olid){
    col.updateOne(
    {"user_id":user_id},
    { $push: { "booksRead": olid } }
  );

 
  }




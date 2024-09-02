"use strict"

import express from "express";
import { createUser, getReadBooks, readBook } from "../controllers/user.mjs";
//This is Redundant ----Figure out how to share client with everything
//TODO JWT Authentication at some point
const router = express.Router()

router.post("/add_new_user/:username/:email", async (req, res) => {
    let username = req.params.username;
    let password = "password";
    let email = req.params.email;
    
    if(!await createUser(username,email,password)){
        res.status(401)
    }
    res.json({})
    res.status(201) 
})

router.post("/readBook/:olid/:user_id", async (req,res) => {
    //should never run into a missing user issue so... hope and pray
    let olid = req.params.olid;
    let user_id = req.params.user_id;
    readBook(user_id, olid);
    res.json({});
    res.status(201);
    
})

router.get("/alreadyRead/:user_id", async (req,res) => {
    let user_id = req.params.user_id;
    let bookslist = await getReadBooks(user_id);
    res.json(bookslist);
    res.status(201)
})

router.post('/login', async(req,res) =>{
    //authenticate The User dopnt really have to 
    
    const username = req.body.username;
    const user = 
    JsonWebTokenError.sign()
})



export default router;
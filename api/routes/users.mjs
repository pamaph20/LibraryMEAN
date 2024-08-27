"use strict"

import express from "express";


import { createUser } from "../controllers/user.mjs";
//This is Redundant ----Figure out how to share client with everything

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
export default router;
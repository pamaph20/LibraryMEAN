"use strict"
import { check_user } from "../controllers/user.mjs";
import express from "express";
// Figure out how to share client with everything
const router = express.Router()
router.get("/search/:user_id", async (req,res) =>{
    /***
     * Returns json library information based on a give user_id -- since user id is used in users
     */
    let user_id = req.params.user_id;
    if(await check_user(user_id) == 0){
      res.status(401)
      res.json(`User ${user_id} does not exist`)
    }
    try{
      let cur = await col.find({
        user_id : user_id
      }).toArray();
      res.json(cur);
    }catch(error){
      console.error(error.message);
    }
  });
export default router;
"use strict"
import express from "express"
import {check_in_mongo} from "../controllers/books.mjs"
const router = express.Router();

router.get("/search/:olid", async (request, response) => {
    /**
     * Returns json info with information about a single book. 
     */
    const olid = request.params.olid;
    response.send(await check_in_mongo(olid));
  }); 

export default router;
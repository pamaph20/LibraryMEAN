"use strict"
import express from "express"
import {getData} from "../controllers/books.mjs"
const router = express.Router();

router.get("/search/:id", async (request, response) => {
    /**
     * Returns json info with information about a single book. 
     */
    const info = request.params.id;
    const search_uri = `https://openlibrary.org/search.json?q=${info}`;
    response.send(await getData(search_uri));
  }); 

export default router;
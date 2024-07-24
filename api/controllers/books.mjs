"use strict"
import { Int32 } from "mongodb";
import book from "../models/book.mjs"

export async function getData(olid) {
    /***
     * Get a books title, author, and ISBN based on OLId
     */
    try {
      const search_uri = `https://openlibrary.org/search.json?q=${olid}`;
      const search_response = await fetch(search_uri);
      if (!search_response.ok) {
        throw new Error(`Response status: ${search_response.status}`);
      }
      const search_data = await search_response.json();
      book.Author = search_data.docs[0].author_name;
      book.ISBN = search_data.docs[0].isbn[0];
      book.ImgURL = `https://covers.openlibrary.org/b/olid/${olid}-S.jpg`;
      book.Title = search_data.docs[0].title;
      book.OLID = olid
      return book;
    } catch (error) {
      console.error(error.message);
    }
  }

 
  
//   async function fetchImage(url) {
//     const img = new Image();
//     return new Promise((res, rej) => {
//         img.onload = () => res(img);
//         img.onerror = e => rej(e);
//         img.src = url;
//     });
// }

// let img_uri = `https://covers.openlibrary.org/b/olid/percyJackson-L.jpg`
// let uri = `https://covers.openlibrary.org/b/id/12547191.json.`
// const img = await fetchImage(img_uri);
// const w = img.width;
// const h = img.height;


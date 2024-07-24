"use strict"

export async function getData(book_id) {
    /***
     * Get a books title, author, and ISBN based on search params in URI 
     */
    try {
      const search_uri = `https://openlibrary.org/search.json?q=${book_id}`;
      const response = await fetch(search_uri);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      let search_json = {
        Title :  data.docs[0].title,
        Author :  data.docs[0].author_name,
        ISBN : data.docs[0].isbn[0]
      }
      return search_json
    } catch (error) {
      console.error(error.message);
    }
  }
  
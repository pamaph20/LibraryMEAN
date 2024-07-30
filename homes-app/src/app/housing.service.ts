import { Injectable } from '@angular/core';
import { Book } from './Book';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = "http://localhost:8001/locations"
  //should just be a general library search.
  libSearchurl = "http://localhost:3000/library/search"
  libUrl = "http://localhost:3000/library/"
  //testing info


  async getAllBooks (): Promise<Book[]> {
    /***\
     * Function that returns all housing locations via an array
     */
    const allData = await fetch(this.libUrl)
    return await allData.json() ?? []
  }

  async getUserBooks(user_id : string, library_name : string): Promise<Book[]>{
    const data = await fetch(`${this.libSearchurl}/${library_name}/${user_id}`);
    return await data.json() ?? [];
  }
  
  async getHousingLocationById(olid: string): Promise<Book | undefined> {
    //takes an id returns a housing location
    const data = await fetch(`http://localhost:3000/books/search/${olid}`);
    return await data.json() ?? {};
    //returns a housing location where the location id is equal to the given id
  }
  constructor() { }

  submitApplication(firstName:string, lastName:string, email:string){
    console.log(firstName,lastName,email)
  }
}

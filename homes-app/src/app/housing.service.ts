import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = "http://localhost:8001/locations"
  //should just be a general library search.
  libSearchurl = "http://localhost:3000/library/search"
  libUrl = "http://localhost:3000/library/"
  //testing info
  lib_name = "Sams%20Library" 
  user_id = "2"
  bookUrl = "http://localhost:3000/books/search"
  async getAllBooks (): Promise<HousingLocation[]> {
    /***\
     * Function that returns all housing locations via an array
     */
    const allData = await fetch(this.libUrl)
    const data = await fetch(`${this.libSearchurl}/${this.lib_name}/${this.user_id}`)
    
    return await data.json() ?? []
  }
  
  async getHousingLocationById(olid: string): Promise<HousingLocation | undefined> {
    //takes an id returns a housing location
    const data = await fetch(`${this.bookUrl}/${olid}`);
    return await data.json() ?? {};
    //returns a housing location where the location id is equal to the given id
  }
  constructor() { }

  submitApplication(firstName:string, lastName:string, email:string){
    console.log(firstName,lastName,email)
  }
}

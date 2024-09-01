import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private http = inject(HttpClient);
  async searchBook(olid: any) {
    const allData = await fetch(`http://localhost:3000/books/search/${olid}`)
    return await allData.json() ?? []
  }
  async addBook(olid: any){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/add_book/Sams%20Library/${olid}/2`,null))
  }
  async removeBook(olid: string, user_id: string, library_id: string){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/remove/${library_id}/${user_id}/${olid}`,null))
  }
  async readBook(olid:string, user_id:string){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/user/readBook/${olid}/${user_id}`, null))
  }
}

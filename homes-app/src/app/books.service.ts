import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private http = inject(HttpClient);
  
  async searchBook(info: any) {
    return firstValueFrom(this.http.get(`http://localhost:3000/books/search/${info}`));
  }
  async addBook(olid: any){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/add_book/Sams%20Library/${olid}/2`,null))
  }
  async removeBook(olid: any){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/remove/Sams%20Library/2/${olid}`,null))
  }
}

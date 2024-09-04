import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { firstValueFrom , BehaviorSubject, of, switchMap} from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private http = inject(HttpClient);
  //Sams Stuff
  private _books = new BehaviorSubject<Book[]>([]);
  public books$ = this._books.asObservable();

  async searchBook(olid: any) {
    const allData = await fetch(`http://localhost:3000/books/search/${olid}`)
    return await allData.json() ?? []
  }
  async addBook(olid: any){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/add_book/Drews%20Library/${olid}/1`,null))
  }
  async removeBook(olid: string, user_id: string, library_id: string){
    return firstValueFrom(this.http.put(`http://localhost:3000/library/remove/${library_id}/${user_id}/${olid}`,null))
  }
  async readBook(olid:string, user_id:string){
    return firstValueFrom(this.http.post(`http://localhost:3000/user/readBook/${olid}/${user_id}`, null))
  }
  initBooks(books:Book[]){
    console.log(books, "here")
    this._books.next(books)
  }
 
  
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { Book } from '../Book';
import { UserLibraryComponent } from '../user-library/user-library.component';
import { UserServiceService } from '../user-service.service';
import { BooksService } from '../books.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-dist',
  templateUrl: './genre-dist.component.html',
  styleUrls: ['./genre-dist.component.css'],
  standalone:true,
  imports:[UserLibraryComponent, CommonModule]
})
export class GenreDistComponent{
  
  userService: UserServiceService = inject(UserServiceService);
  booksService : BooksService = inject(BooksService);
  books$ = this.booksService.books$;
  books : Book[] = [];
  constructor(){
    //Use this with the Books Service SHit
    this.books$.subscribe(res =>{
      this.books = res;
    });
    
  }
   readbooks() {
    console.log(this.books, "here")
   }
 
}




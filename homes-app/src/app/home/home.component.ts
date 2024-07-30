import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Book } from '../Book';
import { HousingService } from '../housing.service';
import { BooksService } from '../books.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserLibraryComponent } from '../user-library/user-library.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, UserLibraryComponent],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showButton: boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  BookList: Book[] = [];
  FilteredBookList: Book[] = [];
  housingService: HousingService = inject(HousingService)
  bookService: BooksService = inject(BooksService)
  
  constructor() {
    this.housingService.getAllBooks().then((BookList : Book[]) => {
      this.FilteredBookList = BookList;
      this.BookList = BookList;
      console.log(this.BookList)
    });
    
  }
  async filterResults(text:string){
    
    if(!text) this.FilteredBookList = this.BookList;
    this.FilteredBookList = this.BookList.filter(
      Book => Book?.Title.toLowerCase().includes(text.toLowerCase())
    )
  }
  async addBook(text:string){
    const result = await this.bookService.addBook(text);
    window.location.reload();
    console.log(result)
  }
   
}

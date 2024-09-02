import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Book } from '../Book';
import { HousingService } from '../housing.service';
import { BooksService } from '../books.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [CommonModule, RouterModule, HousingLocationComponent],
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {
  
  @Input() book!: Book;
  bookService: BooksService = inject(BooksService);
  route : ActivatedRoute = inject(ActivatedRoute);
  BookList: Book[] = [];
  FilteredBookList: Book[] = [];
  housingService: HousingService = inject(HousingService);
  ReadBooks: String[] = [];
  BookStyle: boolean = true;
  constructor() {
    const user_id = (this.route.snapshot.params["user_id"]);
    const library_name = (this.route.snapshot.params["library_id"]);
    this.housingService.getUserBooks(user_id, library_name).then((UsersBooks : Book[]) => {
      this.BookList = UsersBooks;
      console.log(this.BookList, "owned Books");
    }); 
    this.housingService.getUsersReadBooks(user_id).then((read: String[]) => {
      this.ReadBooks = read;
      console.log(this.ReadBooks, "Read Books")
    })
    
  }
  
  async filterResults(text:string){
    console.log(text)
    if(!text) this.FilteredBookList = this.BookList;
    this.FilteredBookList = this.BookList.filter(
      Book => Book?.Title.toLowerCase().includes(text.toLowerCase())
    )
  }
}

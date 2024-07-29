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
  housingService: HousingService = inject(HousingService);
  showButton: boolean = true;
  constructor() {
    const user_id = (this.route.snapshot.params["user_id"]);
    const library_name = (this.route.snapshot.params["library_id"]);
    this.housingService.getUserBooks(user_id, library_name).then((UsersBooks : Book[]) => {
      this.BookList = UsersBooks;
      console.log(this.BookList);
    }); 
  }
  async filterResults(text:string){
    const result = await this.bookService.searchBook(text)
    console.log(result)
  }
}

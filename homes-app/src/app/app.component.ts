import { Component, inject, Input } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './books.service';
import { HousingService } from './housing.service';
import { Book } from './Book';



@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, RouterModule, HttpClientModule],
  templateUrl:"./app.component.html" ,
  styleUrls: ['./app.component.css'],
  providers: [BooksService]
  
})
export class AppComponent {
  @Input() book!: Book;
  title = 'homes';
  route : ActivatedRoute = inject(ActivatedRoute);
  BookList: Book[] = [];
  FilteredBookList: Book[] = [];
  housingService: HousingService = inject(HousingService)
  bookService: BooksService = inject(BooksService)
  async filterResults(text:string){
    if(!text) this.FilteredBookList = this.BookList;
    this.FilteredBookList = this.BookList.filter(
      Book => Book?.Title.toLowerCase().includes(text.toLowerCase())
    )
  }
}

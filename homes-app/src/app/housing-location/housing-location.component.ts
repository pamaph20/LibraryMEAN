import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../Book';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() showButton: boolean = false;
  @Input() book!: Book;
  bookService: BooksService = inject(BooksService)
  route : ActivatedRoute = inject(ActivatedRoute);
  router: any;
  async removeBook(OLID:string,){
    const user_id = (this.route.snapshot.params["user_id"]);
    const library_name = (this.route.snapshot.params["library_id"]);
    const result = await this.bookService.removeBook(OLID,user_id,library_name);
    window.location.reload();
    console.log(result)
  }
  
  
}

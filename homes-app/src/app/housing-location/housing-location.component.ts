import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
 @Input() housingLocation!: HousingLocation;
 bookService: BooksService = inject(BooksService)
 async removeBook(OLID:string){
  const result = await this.bookService.removeBook(OLID);
  window.location.reload();
  console.log(result)
}
}

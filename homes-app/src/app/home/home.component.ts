import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { BooksService } from '../books.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)
  bookService: BooksService = inject(BooksService)
  filteredLocationList : HousingLocation[] = []
  constructor() {
    this.housingService.getAllBooks().then((housingLocationList : HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  async filterResults(text:string){
    const result = await this.bookService.searchBook(text)
    console.log(result)
  }
  async addBook(text:string){
    const result = await this.bookService.addBook(text);
    console.log(result)
  }
}

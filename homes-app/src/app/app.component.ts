import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './books.service';



@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, RouterModule, HttpClientModule],
  templateUrl:"./app.component.html" ,
  styleUrls: ['./app.component.css'],
  providers: [BooksService]
  
})
export class AppComponent {
  title = 'homes';
}

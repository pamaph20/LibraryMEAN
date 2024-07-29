import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../Book';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation : Book |undefined;
  applyForm = new FormGroup({
    firstName : new FormControl(""),
    lastName : new FormControl(""),
    email : new FormControl("")
  })
  constructor() {
    const housingLocationID = (this.route.snapshot.params["olid"]);
    console.log(this.route.snapshot)

    this.housingService.getHousingLocationById(housingLocationID).then(housingLocation=>{
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}

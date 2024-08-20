import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-info',
  templateUrl: './forgot-info.component.html',
  styleUrls: ['./forgot-info.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  
})
export class ForgotInfoComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
}

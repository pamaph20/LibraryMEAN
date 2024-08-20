import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class NewUserComponent {
  @Input() login: boolean = false;
}

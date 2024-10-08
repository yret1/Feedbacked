import { Component } from '@angular/core';
import { AuthButtonComponent } from '../authcomp/authbutton.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuthButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

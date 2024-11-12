import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderboxComponent } from './landingcomps/headerbox/headerbox.component';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterLink, HeaderboxComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/Shared/navbar/navbar.component';
import {RoutetrackerComponent} from "./components/Shared/routetracker/routetracker.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, RoutetrackerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feedbacked-frontend';
}

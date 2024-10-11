import { Component } from '@angular/core';
import { ClientoverviewmodalComponent } from '../../components/clientoverviewmodal/clientoverviewmodal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClientoverviewmodalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user = {
    email: 'gustavssondev@gmail.com',
    password: 'password',

    clients: [
      {
        name: 'Wilner Page',
        status: 'active',
        issues: 2,
      },
      {
        name: 'Nordisk standard',
        status: 'active',
        issues: 3,
      },
      {
        name: 'Leo Tamburini',
        status: 'inactive',
        issues: 0,
      },
    ],
  };
}

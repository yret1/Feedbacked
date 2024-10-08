import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './Dashboard/Dashboard.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Dashboard',
    path: 'dashboard',

    // Protect a route with the Auth
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'clients',
      },
    ],
  },
];

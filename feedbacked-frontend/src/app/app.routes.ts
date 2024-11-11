import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientdashComponent } from './pages/clientdash/clientdash.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  {
    title: 'Sign Up',
    path: 'signup',
    component: SignUpComponent,
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    title: 'Client Dashboard',
    path: 'user/:userId/client/:clientEmail',
    component: ClientdashComponent,
  },
];

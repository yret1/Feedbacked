import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientdashComponent } from './pages/clientdash/clientdash.component';

export const routes: Routes = [
  {
    title: 'Dashboard',
    path: '',
    component: DashboardComponent,
  },
  {
    title: 'Client Dashboard',
    path: 'user/:userId/client/:clientEmail',
    component: ClientdashComponent,
  },
];

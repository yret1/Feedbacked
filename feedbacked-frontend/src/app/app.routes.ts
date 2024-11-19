import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientdashComponent } from './pages/clientdash/clientdash.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { AuthGuard } from '../services/authguard';

export const routes: Routes = [
  {
    title: 'Landing',
    path: '',
    component: LandingpageComponent,
  },
  {
    title: 'Sign Up',
    path: 'signup',
    component: SignUpComponent,
  },
  {
    title: 'Sign In',
    path: 'signin',
    component: SignInComponent,
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    title: 'Client Dashboard',
    path: 'user/projects/client',
    component: ClientdashComponent,
    canActivate: [AuthGuard],
  },
];

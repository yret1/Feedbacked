import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientdashComponent } from './pages/clientdash/clientdash.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { AuthGuard } from '../services/authguard';
import { CreateClientComponent } from './components/Dashboard Comps/create-client/create-client.component';
import { IssuePageComponent } from './pages/issue-page/issue-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DemopageComponent } from './pages/demopage/demopage.component';

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
    title: 'New Project',
    path: 'dashboard/create',
    component: CreateClientComponent,
    canActivate: [AuthGuard],
  },
  {
    title: 'Settings',
    path: 'dashboard/settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    title: 'Project Issue',
    path: 'user/projects/client/issue/:issue/:clientId',
    component: IssuePageComponent,
    canActivate: [AuthGuard],
  },

  {
    title: 'Client Dashboard',
    path: 'user/projects/client',
    component: ClientdashComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

//childroutes

// dashboard/create to start new project
//

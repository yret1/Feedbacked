import { Component, OnInit, signal } from '@angular/core';
import { CenterwrappComponent } from '../../components/Shared/centerwrapp/centerwrapp.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../services/backend';
import { AuthService } from '../../../services/auth';
import { UserInterface } from '../../interfaces/UserInterface';
import {
  integration,
  IntegrationComponent,
} from '../../components/Settings Comps/integration/integration.component';
import { GithubService } from '../../../services/Integrationservices/github.service';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CenterwrappComponent,
    CommonModule,
    FormsModule,
    IntegrationComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  constructor(
    private backend: BackendService,
    private auth: AuthService,
    private github: GithubService
  ) {}

  tabs: ['Profile', 'Payment', 'Integrations', 'Account', 'Data'] = [
    'Profile',
    'Payment',
    'Integrations',
    'Account',
    'Data',
  ];

  user = signal<UserInterface | null>(null);

  selectedIntegration: integration = 'github';

  currentSetting = signal<
    'Profile' | 'Payment' | 'Integrations' | 'Account' | 'Data'
  >('Integrations');

  updateSetting = (
    path: 'Profile' | 'Payment' | 'Integrations' | 'Account' | 'Data'
  ) => {
    this.currentSetting.set(path);
  };

  cancelToken = async (token: string) => {
    const userId = this.auth.getCurrentUserId();
    const updatedUser = this.backend
      .deleteToken(token, userId!)
      .subscribe((response) => {
        this.user.set(response.user);
      });
  };

  addToken = (token: string) => {
    const userId = this.auth.getCurrentUserId();

    const updatedUser = this.backend
      .newToken(token, this.selectedIntegration, userId!)
      .subscribe((response: { message: string; user: UserInterface }) => {
        this.user.set(response!.user);
      });
  };

  ngOnInit(): void {
    this.auth.getId().subscribe((id) => {
      this.backend.getUser(id as string).subscribe((user) => {
        this.user.set(user.user);

        console.log(this.user);
      });
    });
  }
}

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
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../enviroments/enviroment';

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

  tabs: ['Profile', 'Integrations'] = ['Profile', 'Integrations'];

  user = signal<UserInterface | null>(null);

  selectedIntegration: integration = 'github';

  private key = environment.ENCRYPTER;

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
  encrypt(value: string): string | null {
    if (this.key) {
      return CryptoJS.AES.encrypt(value, this.key).toString();
    }
    return null;
  }

  addToken = (token: string) => {
    const userId = this.auth.getCurrentUserId();
    const encryptedToken = this.encrypt(token);
    if (encryptedToken) {
      const updatedUser = this.backend
        .newToken(encryptedToken, this.selectedIntegration, userId!)
        .subscribe((response: { message: string; user: UserInterface }) => {
          this.user.set(response!.user);
        });
    }
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

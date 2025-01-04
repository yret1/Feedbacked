import { Component, signal } from '@angular/core';
import { CenterwrappComponent } from '../../components/Shared/centerwrapp/centerwrapp.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CenterwrappComponent, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  tabs: ['Profile', 'Payment', 'Integrations', 'Account', 'Data'] = [
    'Profile',
    'Payment',
    'Integrations',
    'Account',
    'Data',
  ];

  selectedIntegration = '';

  currentSetting = signal<
    'Profile' | 'Payment' | 'Integrations' | 'Account' | 'Data'
  >('Profile');

  updateSetting = (
    path: 'Profile' | 'Payment' | 'Integrations' | 'Account' | 'Data'
  ) => {
    this.currentSetting.set(path);
  };
}

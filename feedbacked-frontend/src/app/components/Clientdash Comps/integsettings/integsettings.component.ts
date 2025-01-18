import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-integsettings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './integsettings.component.html',
  styleUrl: './integsettings.component.scss',
})
export class IntegsettingsComponent {
  @Output() newIntegration = new EventEmitter();
  @Output() removeIntegration = new EventEmitter();
  @Input() isIntegrated!: boolean;

  owner: string = '';
  repo: string = '';

  sendIntegration() {
    this.newIntegration.emit({
      owner: this.owner,
      repo: this.repo,
    });
  }

  killIntegration() {
    this.removeIntegration.emit();
  }
}

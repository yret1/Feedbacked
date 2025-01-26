import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Sanitizer,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iconservice } from '../../../../services/icons.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-integsettings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './integsettings.component.html',
  styleUrl: './integsettings.component.scss',
})
export class IntegsettingsComponent implements OnInit {
  @Output() newIntegration = new EventEmitter();
  @Output() removeIntegration = new EventEmitter();
  @Output() triggerClose = new EventEmitter();
  @Input() isIntegrated!: boolean;
  @Input() details?: {
    repo: string;
    owner: string;
  };

  constructor(private icon: Iconservice, private sanitize: DomSanitizer) {}

  owner: string = '';
  repo: string = '';

  ghIcon!: SafeHtml;

  close() {
    this.triggerClose.emit();
  }

  sendIntegration() {
    if (this.owner !== '' && this.repo !== '') {
      this.newIntegration.emit({
        owner: this.owner,
        repo: this.repo,
      });
    } else {
      alert('Enter both the owner and target repository before sending');
    }
  }

  killIntegration() {
    this.removeIntegration.emit();
  }

  validate() {
    return this.owner == '' || this.repo == '';
  }

  ngOnInit(): void {
    const icon = this.icon.getIntegrationIcon('github');
    this.ghIcon = this.sanitize.bypassSecurityTrustHtml(icon);
  }
}

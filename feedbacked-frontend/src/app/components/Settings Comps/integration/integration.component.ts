import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';
import { Iconservice } from '../../../../services/icons.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInterface } from '../../../interfaces/UserInterface';

export type integration = 'github' | 'none';

@Component({
    selector: 'app-integration',
    imports: [CommonModule, FormsModule],
    templateUrl: './integration.component.html',
    styleUrl: './integration.component.scss'
})
export class IntegrationComponent {
  @Output() removeToken = new EventEmitter();
  @Output() addToken = new EventEmitter();

  Token: string = '';

  tokenRegex = /^github_pat_[A-Za-z0-9_]+$/;

  deleteToken(token: string) {
    this.removeToken.emit(token);
  }

  newToken(token: string) {
    if (this.tokenRegex.test(token)) {
      this.addToken.emit(token);
    } else {
      alert('Please enter a valid token');
    }
  }

  selected = input<integration>('none');
  integrations = input<{ title: string; token: string; updated_on: Date }[]>();

  user = input<UserInterface | null>();

  constructor(private icons: Iconservice, private sanitizer: DomSanitizer) {}

  isIntegrated = computed(() => {
    if (this.integrations()) {
      const targetInt = this.integrations()!.find(
        (integ) => integ.title === this.selected()
      );
      return targetInt || null; // Return null instead of false
    }
    return null; // Return null instead of false
  });

  currentIcon = computed(() => {
    const icon = this.icons.getIntegrationIcon(this.selected());
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  });
}

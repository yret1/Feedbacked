import { Component, computed, input, Input } from '@angular/core';
import { Iconservice } from '../../../../services/icons.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export type integration = 'github' | 'none';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.scss',
})
export class IntegrationComponent {
  selected = input<integration>('none');

  constructor(private icons: Iconservice, private sanitizer: DomSanitizer) {}

  currentIcon = computed(() => {
    const icon = this.icons.getIntegrationIcon(this.selected());
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  });
}

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-installpopup',
  standalone: true,
  imports: [],
  templateUrl: './installpopup.component.html',
  styleUrl: './installpopup.component.scss',
  animations: [
    trigger('Fader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class InstallpopupComponent {
  @Input() userId!: string;
  @Input() clientId!: string;
  @Input() clientName!: string;

  @Output() close = new EventEmitter<void>();
  copyText = signal<string>('Copy');

  closeModal(event: MouseEvent): void {
    // Only close if clicking the backdrop (popup), not the modal content
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  copyCode() {
    // Construct the script tag
    const scriptTag = `<script src="http://localhost:3002/script/${this.userId}/${this.clientId}"></script>`;

    navigator.clipboard
      .writeText(scriptTag)
      .then(() => {
        console.log('Script tag copied successfully');

        this.copyText.set('Copied!');

        setTimeout(() => {
          this.copyText.set('Copy');
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to copy script tag:', err);
      });
  }
}

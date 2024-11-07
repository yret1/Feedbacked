import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-keycomp',
  standalone: true,
  imports: [],
  templateUrl: './keycomp.component.html',
  styleUrl: './keycomp.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class KeycompComponent {
  @Input() key!: string;
  @Input() for!: string;
  @Output() copyToClipboard = new EventEmitter<string>();
  @Output() deleteKey = new EventEmitter<string>();

  popup = signal<boolean>(false);
  action: string = 'erroraddkey';

  handleCopy() {
    this.copyToClipboard.emit(this.key);
  }

  handleDetete() {
    this.deleteKey.emit(this.key);
  }
}

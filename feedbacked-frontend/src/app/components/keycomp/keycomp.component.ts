import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-keycomp',
  standalone: true,
  imports: [],
  templateUrl: './keycomp.component.html',
  styleUrl: './keycomp.component.scss',
})
export class KeycompComponent {
  @Input() key!: string;
  @Input() for!: string;
  @Output() copyToClipboard = new EventEmitter<string>();

  popup = signal<boolean>(false);
  action: string = 'erroraddkey';

  handleCopy() {
    this.copyToClipboard.emit(this.key);
  }
}

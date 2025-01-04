import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-installpopup',
  standalone: true,
  imports: [],
  templateUrl: './installpopup.component.html',
  styleUrl: './installpopup.component.scss',
})
export class InstallpopupComponent {
  @Input() userId!: string;
  @Input() clientId!: string;
  @Input() clientName!: string;
}

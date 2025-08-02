import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-procon',
    imports: [CommonModule],
    templateUrl: './procon.component.html',
    styleUrl: './procon.component.scss'
})
export class ProconComponent {
  @Input() pro!: boolean;
  @Input() name!: string;
  @Input() description!: string;
}

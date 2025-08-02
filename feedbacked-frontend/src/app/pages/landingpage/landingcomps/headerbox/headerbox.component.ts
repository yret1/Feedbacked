import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-headerbox',
    imports: [],
    templateUrl: './headerbox.component.html',
    styleUrl: './headerbox.component.scss'
})
export class HeaderboxComponent {
  @Input() title!: string;
  @Input() header!: string;
  @Input() description!: string;
  @Input() by!: string;
}

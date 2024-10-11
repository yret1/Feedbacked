import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clientoverviewmodal',
  standalone: true,
  imports: [],
  templateUrl: './clientoverviewmodal.component.html',
  styleUrl: './clientoverviewmodal.component.scss',
})
export class ClientoverviewmodalComponent {
  @Input() status: string = '';
  @Input() client: string = '';
  @Input() issues: string = '';
}

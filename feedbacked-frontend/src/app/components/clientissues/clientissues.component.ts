import { Component, Input } from '@angular/core';
import { ClientsInterface } from '../../interfaces/Clientsinterface';

@Component({
  selector: 'app-clientissues',
  standalone: true,
  imports: [],
  templateUrl: './clientissues.component.html',
  styleUrl: './clientissues.component.scss',
})
export class ClientissuesComponent {
  @Input() clientData!: ClientsInterface;
}

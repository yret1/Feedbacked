import { Component, Input } from '@angular/core';
import { ClientsInterface } from '../../../interfaces/Clientsinterface';
import { BackendService } from '../../../../services/backend';

@Component({
  selector: 'app-clientdetails',
  standalone: true,
  imports: [],
  templateUrl: './clientdetails.component.html',
  styleUrl: './clientdetails.component.scss',
})
export class ClientdetailsComponent {
  @Input() clientData!: ClientsInterface;

  constructor(private backendService: BackendService) {}

  clientCompleted() {
    this.backendService
      .clientCompleted(
        '67098ea930f92b27553d10a1',
        this.clientData.email,
        'inactive'
      )
      .subscribe(
        (data) => {
          console.log(data);

          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  clientReopen() {
    this.backendService
      .clientCompleted(
        '67098ea930f92b27553d10a1',
        this.clientData.email,
        'active'
      )
      .subscribe(
        (data) => {
          console.log(data);

          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

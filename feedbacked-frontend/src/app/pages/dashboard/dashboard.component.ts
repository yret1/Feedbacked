import { Component, signal } from '@angular/core';
import { ClientoverviewmodalComponent } from '../../components/clientoverviewmodal/clientoverviewmodal.component';
import { BackendService } from '../../../services/backend';

interface Client {
  name: string;
  email: string;
  phone: string;
  status: string;
  feedbacks: any[];
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClientoverviewmodalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private backendService: BackendService) {}

  clientId: string = '67098ea930f92b27553d10a1';

  clients = signal<Client[]>([]);

  ngOnInit() {
    this.backendService.getClients(this.clientId).subscribe((data) => {
      this.clients.set(data.clients);

      console.log(data);
    });
  }
}

import { Component, signal } from '@angular/core';
import { ClientoverviewmodalComponent } from '../../components/clientoverviewmodal/clientoverviewmodal.component';
import { BackendService } from '../../../services/backend';
import { LoadingcompComponent } from '../../components/loadingcomp/loadingcomp.component';

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
  imports: [ClientoverviewmodalComponent, LoadingcompComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private backendService: BackendService) {}

  clientId: string = '67098ea930f92b27553d10a1';
  loading = signal<boolean>(true);
  clients = signal<Client[]>([]);

  placeholders = ['1', '2', '3', '4'];

  ngOnInit() {
    this.backendService.getClients(this.clientId).subscribe((data) => {
      this.clients.set(data.clients);
      this.loading.set(false);

      console.log(data);
    });
  }
}

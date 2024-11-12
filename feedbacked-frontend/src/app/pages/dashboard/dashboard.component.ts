import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ClientoverviewmodalComponent } from '../../components/clientoverviewmodal/clientoverviewmodal.component';
import { BackendService } from '../../../services/backend';
import { LoadingcompComponent } from '../../components/loadingcomp/loadingcomp.component';
import { AuthService } from '../../../services/auth';
import { Subscription } from 'rxjs';

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
export class DashboardComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | undefined;

  constructor(
    private backendService: BackendService,
    private authService: AuthService
  ) {}

  userId = this.authService.getCurrentUserId();
  loading = signal<boolean>(true);
  clients = signal<Client[]>([]);
  placeholders = ['1', '2', '3', '4'];

  ngOnInit() {
    this.userSubscription = this.authService.getId().subscribe((userId) => {
      console.log('userId:', userId);
      if (userId) {
        this.backendService.getClients(userId).subscribe({
          next: (data) => {
            this.clients.set(data.clients);
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error fetching clients:', error);
            this.loading.set(false);
          },
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

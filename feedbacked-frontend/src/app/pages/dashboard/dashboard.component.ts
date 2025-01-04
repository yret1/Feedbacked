import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ClientoverviewmodalComponent } from '../../components/Dashboard Comps/clientoverviewmodal/clientoverviewmodal.component';
import { BackendService } from '../../../services/backend';
import { AuthService } from '../../../services/auth';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  feedbacks: any[];
}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  clients: Client[];
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClientoverviewmodalComponent, RouterLink],
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
  currentUser!: User;
  loading = signal<boolean>(true);
  clients = signal<Client[]>([]);
  placeholders = ['1', '2', '3', '4'];
  currentPhrase!: string;

  phrases = [
    'Ready to solve some issues?',
    "Let's get that project done.",
    'Have a productive day!',
  ];

  getPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  ngOnInit() {
    this.currentPhrase = this.getPhrase();
    this.userSubscription = this.authService.getId().subscribe((userId) => {
      if (userId) {
        this.backendService.getClients(userId).subscribe({
          next: (data) => {
            const clients = data.clients.filter(
              (client: Client) => client.status == 'active'
            );
            this.clients.set(clients);
            this.loading.set(false);
          },

          error: (error) => {
            console.error('Error fetching clients:', error);
            this.loading.set(false);
          },
        });

        this.backendService.getUser(userId).subscribe((user) => {
          this.currentUser = user.user;
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

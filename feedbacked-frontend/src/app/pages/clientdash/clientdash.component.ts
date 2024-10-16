import { Component, OnInit, signal } from '@angular/core';
import { BackendService } from '../../../services/backend';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientdetailsComponent } from '../../components/clientdetails/clientdetails.component';
import { ClientissuesComponent } from '../../components/clientissues/clientissues.component';
import { LoadingcompComponent } from '../../components/loadingcomp/loadingcomp.component';

@Component({
  selector: 'app-clientdash',
  standalone: true,
  imports: [
    RouterLink,
    ClientdetailsComponent,
    ClientissuesComponent,
    LoadingcompComponent,
  ],
  templateUrl: './clientdash.component.html',
  styleUrl: './clientdash.component.scss',
})
export class ClientdashComponent implements OnInit {
  goBack = '/';

  userId!: string;
  clientEmail!: string;
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute
  ) {}

  loading = signal<boolean>(true);

  clientData: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.clientEmail = params['clientEmail'];
      this.backendService.getClient(this.userId, this.clientEmail).subscribe(
        (data) => {
          console.log(data);
          this.clientData = data.client;
          this.loading.set(false);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

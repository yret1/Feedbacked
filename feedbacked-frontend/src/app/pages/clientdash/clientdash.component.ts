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

  newKeyName: string = '';
  allowedKeys: number = 0;
  loading = signal<boolean>(true);

  adding = signal<boolean>(false);

  clientData: any;

  toggleAdd() {
    this.adding.set(!this.adding());
  }

  plan = 'base';

  keyCheck() {
    this.plan = 'base';

    switch (this.plan) {
      case 'base':
        this.allowedKeys = 1;
        break;
      case 'large':
        this.allowedKeys = 3;
        break;
      case 'enterprise':
        this.allowedKeys = 10;
        break;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.clientEmail = params['clientEmail'];
      this.backendService.getUser(this.userId).subscribe((data) => {
        console.log(data);
        this.plan = data.user.plan;
      });
      this.keyCheck();
      this.backendService.getClient(this.userId, this.clientEmail).subscribe(
        (data) => {
          console.log(data);
          this.clientData = data.client;
          console.log();
          this.loading.set(false);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

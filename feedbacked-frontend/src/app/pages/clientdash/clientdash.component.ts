import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientdetailsComponent } from '../../components/clientdetails/clientdetails.component';

@Component({
  selector: 'app-clientdash',
  standalone: true,
  imports: [RouterLink, ClientdetailsComponent],
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

  clientData: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.clientEmail = params['clientEmail'];
      this.backendService.getClient(this.userId, this.clientEmail).subscribe(
        (data) => {
          console.log(data);
          this.clientData = data.client;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

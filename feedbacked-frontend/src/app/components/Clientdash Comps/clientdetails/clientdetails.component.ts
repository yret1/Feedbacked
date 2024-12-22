import { Component, Input, OnInit } from '@angular/core';
import { ClientsInterface } from '../../../interfaces/Clientsinterface';
import { BackendService } from '../../../../services/backend';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-clientdetails',
  standalone: true,
  imports: [],
  templateUrl: './clientdetails.component.html',
  styleUrl: './clientdetails.component.scss',
})
export class ClientdetailsComponent implements OnInit {
  @Input() clientData!: ClientsInterface;

  userId!: string;
  constructor(
    private backendService: BackendService,
    private auth: AuthService,
    private router: Router
  ) {}

  clientCompleted() {
    this.backendService
      .clientCompleted(this.userId, this.clientData.email, 'inactive')
      .subscribe();
    this.router.navigate(['/dashboard']);
    alert('Project closed succesfully!');
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

  ngOnInit(): void {
    const id = this.auth.getCurrentUserId();

    if (id) {
      this.userId = id;
    } else {
    }
  }
}

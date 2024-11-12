import { Component, OnInit, signal } from '@angular/core';
import { BackendService } from '../../../services/backend';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientdetailsComponent } from '../../components/clientdetails/clientdetails.component';
import { ClientissuesComponent } from '../../components/clientissues/clientissues.component';
import { LoadingcompComponent } from '../../components/loadingcomp/loadingcomp.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { KeycompComponent } from '../../components/keycomp/keycomp.component';
import { FormsModule } from '@angular/forms';
import { ClientsInterface } from '../../interfaces/Clientsinterface';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-clientdash',
  standalone: true,
  imports: [
    RouterLink,
    ClientdetailsComponent,
    ClientissuesComponent,
    LoadingcompComponent,
    PopupComponent,
    KeycompComponent,
    FormsModule,
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
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  newKeyName: string = '';
  allowedKeys: number = 0;
  loading = signal<boolean>(true);
  action: string = '';
  adding = signal<boolean>(false);
  popup = signal<boolean>(false);

  clientData!: ClientsInterface;

  toggleAdd(action: string) {
    if (action === '') {
      this.adding.set(!this.adding());
    } else {
      this.adding.set(false);
      this.action = action;
      this.popup.set(!this.popup());

      setTimeout(() => {
        this.popup.set(!this.popup());
      }, 4000);
    }
  }

  copyToClipboard(key: string) {
    console.log('Copying key to clipboard');
    navigator.clipboard.writeText(key);

    this.action = 'copied';
    this.popup.set(true);

    setTimeout(() => {
      this.popup.set(false);
    }, 4000);
  }

  deleteKey(key: string) {
    console.log('Deleting key');
    this.backendService.deleteKey(this.userId, this.clientEmail, key).subscribe(
      (data) => {
        this.clientData.keys = this.clientData.keys.filter(
          (k: any) => k.key !== key
        );

        this.action = 'successdeletekey';
        this.popup.set(true);

        setTimeout(() => {
          this.popup.set(false);
        }, 4000);
      },
      (error) => {
        this.action = 'errordeletekey';
        this.popup.set(true);

        setTimeout(() => {
          this.popup.set(false);
        }, 4000);
      }
    );
  }

  addKey() {
    this.adding.set(false);
    this.backendService
      .addKey(this.userId, this.clientEmail, this.newKeyName)
      .subscribe(
        (data: any) => {
          const generatedkey = data.key;
          this.clientData.keys.push({
            key: generatedkey,
            for: this.newKeyName,
            clientEmail: this.clientEmail,
            created_at: new Date().toISOString(),
          });
          this.newKeyName = '';
          this.toggleAdd('successaddkey');
        },
        (error) => {
          this.toggleAdd('erroraddkey');
        }
      );
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
    this.authService.getId().subscribe((userId) => {
      this.userId = userId ?? '';
      this.clientEmail = localStorage.getItem('client') ?? '';

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

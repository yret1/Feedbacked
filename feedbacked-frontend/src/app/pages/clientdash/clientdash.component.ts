import { Component, OnChanges, OnInit, signal } from '@angular/core';
import { BackendService } from '../../../services/backend';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientdetailsComponent } from '../../components/Clientdash Comps/clientdetails/clientdetails.component';
import { ClientissuesComponent } from '../../components/Clientdash Comps/clientissues/clientissues.component';
import { LoadingcompComponent } from '../../components/Shared/loadingcomp/loadingcomp.component';
import { PopupComponent } from '../../components/Shared/popup/popup.component';
import { KeycompComponent } from '../../components/Clientdash Comps/keycomp/keycomp.component';
import { FormsModule } from '@angular/forms';
import {
  ClientsInterface,
  FeedbackInterface,
  IssueInterface,
} from '../../interfaces/Clientsinterface';
import { AuthService } from '../../../services/auth';
import { CenterwrappComponent } from '../../components/Shared/centerwrapp/centerwrapp.component';
import { InstallpopupComponent } from '../../components/Clientdash Comps/installpopup/installpopup.component';

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
    CenterwrappComponent,
    InstallpopupComponent,
  ],
  templateUrl: './clientdash.component.html',
  styleUrl: './clientdash.component.scss',
})
export class ClientdashComponent implements OnInit {
  //Back url
  goBack = '/';

  //Userdata handlers
  userId!: string;
  clientId!: string;
  clientData!: ClientsInterface;

  //Issueholders
  issues!: FeedbackInterface[];
  currentIssueLoop!: FeedbackInterface[];

  //Filter functions
  currentFilter: 'All' | 'Unresolved' | 'Resolved' = 'All';

  //Private services
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  //Loading tracker
  loading = signal<boolean>(true);

  //Key handling
  newKeyName: string = '';
  allowedKeys: number = 0;
  action: string = '';
  adding = signal<boolean>(false);
  popup = signal<boolean>(false);
  openPop = signal<boolean>(false);

  //Toggle info

  toggleInfo() {
    this.openPop.set(!this.openPop);
  }
  // (Key handle functions)

  //Trigger flow for adding new client key
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

  //Copy key to clipboard
  copyToClipboard(key: string) {
    navigator.clipboard.writeText(key);

    this.action = 'copied';
    this.popup.set(true);

    setTimeout(() => {
      this.popup.set(false);
    }, 4000);
  }

  //Delete key
  deleteKey(key: string) {
    this.backendService.deleteKey(this.userId, this.clientId, key).subscribe(
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
      .addKey(this.userId, this.clientId, this.newKeyName)
      .subscribe(
        (data: any) => {
          const generatedkey = data.key;
          this.clientData.keys.push({
            key: generatedkey,
            for: this.newKeyName,
            clientEmail: this.clientData.email,
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

  //Placeholder plan
  plan = 'base';

  keyCheck() {
    //TODO: Implement dynamic plan check!
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

  //Filtersetter
  filterChange(event: any) {
    const filterTrigger = event?.target?.value || 'All';
    switch (filterTrigger) {
      case 'All':
        this.currentIssueLoop = this.issues;
        break;
      case 'Unresolved':
        this.currentIssueLoop = this.issues.filter(
          (iss) => iss.status !== 'Resolved'
        );
        break;
      case 'Resolved':
        this.currentIssueLoop = this.issues.filter(
          (iss) => iss.status !== 'Unresolved'
        );
        break;

      default:
        this.currentIssueLoop = this.issues;
    }
  }

  ngOnInit(): void {
    this.authService.getId().subscribe((userId) => {
      this.userId = userId ?? '';
      this.clientId = localStorage.getItem('client') || '';

      this.backendService.getUser(this.userId).subscribe((data) => {
        this.plan = data.user.plan;
      });
      this.keyCheck();
      this.backendService.getClient(this.userId, this.clientId).subscribe(
        (data) => {
          this.clientData = data.client;
          console.log(data);
          this.issues = data.client.feedbacks;
          this.currentIssueLoop = data.client.feedbacks.filter(
            (issue: IssueInterface) => issue.status !== 'Resolved'
          );
          this.loading.set(false);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

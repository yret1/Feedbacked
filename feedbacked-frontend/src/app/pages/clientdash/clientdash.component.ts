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
import { GithubService } from '../../../services/Integrationservices/github.service';
import { CommonModule } from '@angular/common';
import { IntegsettingsComponent } from '../../components/Clientdash Comps/integsettings/integsettings.component';
import { UserInterface } from '../../interfaces/UserInterface';

@Component({
    selector: 'app-clientdash',
    imports: [
        RouterLink,
        ClientdetailsComponent,
        ClientissuesComponent,
        LoadingcompComponent,
        PopupComponent,
        CommonModule,
        FormsModule,
        CenterwrappComponent,
        InstallpopupComponent,
        IntegsettingsComponent,
    ],
    templateUrl: './clientdash.component.html',
    styleUrl: './clientdash.component.scss'
})
export class ClientdashComponent implements OnInit {
  //Back url
  goBack = '/';

  //Userdata handlers
  userId!: string;
  clientId!: string;
  clientData!: ClientsInterface;
  integrationTarget?: any;

  //Issueholders
  issues!: FeedbackInterface[];
  currentIssueLoop!: FeedbackInterface[];
  integrationTargeted: boolean = false;
  integratonKey: boolean = false;

  //Filter functions
  currentFilter: 'All' | 'Unresolved' | 'Resolved' = 'All';

  //Private services
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private github: GithubService
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
  integrated!: boolean;
  integTargetOpen = signal<boolean>(false);

  //Toggle info

  toggleInfo() {
    if (this.openPop()) {
      this.openPop.set(false);
    } else {
      this.openPop.set(true);
    }
  }

  toggleIntSettings() {
    if (this.integTargetOpen()) {
      this.integTargetOpen.set(false);
    } else {
      this.integTargetOpen.set(true);
    }
  }

  closeRequest() {
    this.toggleInfo();
  }
  // (Key handle functions)

  //Targetset

  async targetGithub(event: { owner: string; repo: string }) {
    this.github.addTarget(event.owner, event.repo);
    alert('Created new connection');
    this.integTargetOpen.set(false);
    window.location.reload();
    setTimeout(() => {
      this.reloader();
    }, 1000);
  }

  async removeTargetGithub() {
    this.github.removeTarget();
    alert('Connection removed');
    this.integTargetOpen.set(false);
    window.location.reload();
    setTimeout(() => {
      this.reloader();
    }, 1000);
  }

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

  reloader() {
    this.authService.getId().subscribe((userId) => {
      this.userId = userId ?? '';
      this.clientId = localStorage.getItem('client') || '';

      this.backendService.getUser(this.userId).subscribe((data) => {
        this.plan = data.user.plan;

        const userData = data.user as UserInterface;
        if (
          userData.settings.integrations.some(
            (integ) => integ.title === 'github'
          )
        ) {
          this.integratonKey = true;
        }
      });
      this.keyCheck();
      this.backendService.getClient(this.userId, this.clientId).subscribe(
        (data) => {
          this.clientData = data.client;
          console.log(data);

          if (this.clientData.integrationSettings?.owner) {
            this.integrationTargeted = true;
          }
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

  async ngOnInit(): Promise<void> {
    this.authService.getId().subscribe((userId) => {
      this.userId = userId ?? '';
      this.clientId = localStorage.getItem('client') || '';

      this.backendService.getUser(this.userId).subscribe((data) => {
        this.plan = data.user.plan;

        const userData = data.user as UserInterface;
        if (
          userData.settings.integrations.some(
            (integ) => integ.title === 'github'
          )
        ) {
          this.integratonKey = true;
        }
      });
      this.keyCheck();
      this.backendService.getClient(this.userId, this.clientId).subscribe(
        (data) => {
          this.clientData = data.client;
          console.log(data);

          if (this.clientData.integrationSettings?.owner) {
            this.integrationTargeted = true;

            this.integrationTarget = this.clientData.integrationSettings;
          }
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

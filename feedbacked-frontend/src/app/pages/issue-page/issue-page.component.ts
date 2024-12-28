import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../services/backend';
import { AuthService } from '../../../services/auth';
import { IssueInterface } from '../../interfaces/Clientsinterface';
import { LoadingcompComponent } from '../../components/Shared/loadingcomp/loadingcomp.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CenterwrappComponent } from '../../components/Shared/centerwrapp/centerwrapp.component';
import { DeviceScreenComponent } from '../../components/Issue Comps/device-screen/device-screen.component';
import { DeviceDetectionService } from '../../../services/device-detections.service';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [
    LoadingcompComponent,
    DatePipe,
    TitleCasePipe,
    CenterwrappComponent,
    DeviceScreenComponent,
  ],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.scss',
})
export class IssuePageComponent implements OnInit {
  //Services
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private auth: AuthService,
    private deviceDetect: DeviceDetectionService
  ) {}

  //Store id's for handling issue
  issueId!: string;
  clientId!: string;
  userId!: string;

  //Issue to be rendered
  issue!: IssueInterface;

  //UserAgent Details

  userBrowser = '';
  userOperating = '';
  //When issue is resloved

  onResolve() {
    this.backend
      .resolveIssue(this.userId, this.issueId, this.clientId)
      .subscribe(() => {
        this.router.navigate(['user/projects/client']);
      });
  }

  //When component mounts run
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      //Grab the selected issue using params
      const issueId = params['issue'];
      this.issueId = issueId;
      const clientId = params['clientId'];
      this.clientId = clientId;
      const userId = (await this.auth.getCurrentUserId()) || '';
      this.userId = userId;
      if (issueId || clientId || userId !== '') {
        //Send request to backend and subscribe to response
        this.backend
          .getSpecificIssue(userId, issueId, clientId)
          .subscribe((issue) => {
            //Use the found issue
            this.issue = issue as IssueInterface;

            this.userBrowser = this.deviceDetect.detectBrowser(
              this.issue.device.browser
            );
            this.userOperating = this.deviceDetect.detectOS(
              this.issue.device.device
            );
          });
      }
    });
  }
}

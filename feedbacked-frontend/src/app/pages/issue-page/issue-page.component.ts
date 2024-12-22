import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/backend';
import { AuthService } from '../../../services/auth';
import { IssueInterface } from '../../interfaces/Clientsinterface';
import { LoadingcompComponent } from '../../components/Shared/loadingcomp/loadingcomp.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [LoadingcompComponent, DatePipe],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.scss',
})
export class IssuePageComponent implements OnInit {
  //Services
  constructor(
    private route: ActivatedRoute,
    private backend: BackendService,
    private auth: AuthService
  ) {}

  //Store id's for handling issue

  issueId!: string;
  clientId!: string;
  userId!: string;

  //Issue to be rendered
  issue!: IssueInterface;

  //When issue is resloved

  onResolve() {
    //TODO
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
          });
      }
    });
  }
}

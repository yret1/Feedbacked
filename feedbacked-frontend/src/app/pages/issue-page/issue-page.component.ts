import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackInterface } from '../../interfaces/Clientsinterface';
import { IssueService } from '../../../services/issueService';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.scss',
})
export class IssuePageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private issues: IssueService) {}

  issueId!: string;

  issue!: FeedbackInterface;

  async retriveIssue() {
    console.log('running');
    const issue = await this.issues.getIssue(this.issueId);
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.issueId = params['issue'];

      this.retriveIssue();
    });
  }
}

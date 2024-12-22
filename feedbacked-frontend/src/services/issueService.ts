import { Injectable } from '@angular/core';
import { BackendService } from './backend';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class IssueService {
  constructor(private backend: BackendService, private auth: AuthService) {}

  async getIssue(issueId: string) {
    const user = await this.auth.getCurrentUserId();

    if (user) {
      const issue = await this.backend.getSpecificIssue(user, issueId);

      return issue;
    }
    return null;
  }
}

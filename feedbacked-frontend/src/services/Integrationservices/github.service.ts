import { Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { BackendService } from '../backend';
import { IssueInterface } from '../../app/interfaces/Clientsinterface';
import { UserInterface } from '../../app/interfaces/UserInterface';
import { Octokit } from 'octokit';

export interface TargetParams {
  owner: string;
  repo: string;
}
@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private auth: AuthService, private backend: BackendService) {}

  newIssue = async (issue: IssueInterface, target: TargetParams) => {
    try {
      const id = this.auth.getCurrentUserId();

      if (id) {
        this.backend
          .getUser(id)
          .subscribe(async (user: { user: UserInterface }) => {
            const userData = user.user;
            const token = userData.settings.integrations.find(
              (setting) => setting.title === 'github'
            );

            console.log(token);

            if (token) {
              const octokit = new Octokit({
                auth: token.token,
              });

              await octokit.request(
                `Post /repos/${target.owner}/${target.repo}/issues`,
                {
                  owner: target.owner,
                  repo: target.repo,
                  title: issue.title,
                  body:
                    issue.description + ' ' + 'Image Attatched' + issue.image,
                  labels: ['Feedbacked Issue'],
                  headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                  },
                }
              );
            }
          });
      }
    } catch (error) {}
  };
}

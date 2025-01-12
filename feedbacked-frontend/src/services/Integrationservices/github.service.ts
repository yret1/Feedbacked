import { Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { BackendService } from '../backend';
import { IssueInterface } from '../../app/interfaces/Clientsinterface';
import { UserInterface } from '../../app/interfaces/UserInterface';
import { Octokit } from 'octokit';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import * as CryptoJS from 'crypto-js';

export interface TargetParams {
  owner: string;
  repo: string;
}
@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private auth: AuthService, private backend: BackendService) {}

  private key = environment.ENCRYPTER;

  // Decrypt key
  decrypt(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

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

            if (token) {
              const octokit = new Octokit({
                auth: this.decrypt(token.token),
              });

              const date = new Date(issue.created_at).toLocaleDateString();

              await octokit.request(
                `Post /repos/${target.owner}/${target.repo}/issues`,
                {
                  owner: target.owner,
                  repo: target.repo,
                  title: issue.title,
                  body: `#Feedback : ${issue.title}\n\n${
                    issue.description
                  }\n\n<sub>Issue created by ${issue.by} on ${date}</sub>\n\n${
                    issue.image
                      ? `<details>
    <summary>View attached image</summary>
    \n\n![Image](${issue.image})\n</details>`
                      : '# No image attached'
                  }\n\n# Technical details\n\nUser browser: ${
                    issue.device.browser
                  } \n\nUser Device: ${
                    issue.device.device + ' ' + issue.device.type
                  }\n\nErrors: ${
                    issue.errors.length > 0
                      ? '\n' + issue.errors.join('\n')
                      : 'No errors'
                  }\n\nWarnings: ${
                    issue.warnings.length > 0
                      ? '\n' + issue.warnings.join('\n')
                      : 'No warnings'
                  }\n\n`,
                  labels: ['Feedbacked Issue'],
                  headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                  },
                }
              );
            }
          });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  retriveIssues = async (target: TargetParams) => {
    const userId = this.auth.getCurrentUserId();

    const { owner, repo } = target;

    const FeedbackIssues: IssueInterface[] = [];

    if (userId) {
      this.backend
        .getUser(userId)
        .subscribe(async (user: { user: UserInterface }) => {
          const userData = user.user;
          const token = userData.settings.integrations.find(
            (setting) => setting.title === 'github'
          );

          if (token) {
            const octokit = new Octokit({
              auth: this.decrypt(token.token),
            });
            const allIssues = await octokit.request(
              `GET /repos/${owner}/${repo}/issues`,
              {
                owner: owner,
                repo: repo,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28',
                },
              }
            );

            const feedbackIssues = await allIssues.data.filter((issue: any) =>
              issue.labels.some(
                (label: any) => label.name === 'Feedbacked Issue'
              )
            );

            if (feedbackIssues.length > 0) {
              feedbackIssues.map(() => {});
            }
          }
        });
    }
  };

  deleteToken = async (token: string): Promise<UserInterface | string> => {
    const userId = this.auth.getCurrentUserId();

    if (userId) {
      // Delete the token
      (await this.backend.deleteToken(token, userId)).subscribe();

      // Fetch the updated user
      const user = await lastValueFrom(this.backend.getUser(userId));

      return user.user; // Assuming user.user is of type UserInterface
    }

    return 'Something went wrong!';
  };
}

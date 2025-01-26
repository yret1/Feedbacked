import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newClient } from '../app/interfaces/Backend';
import { AuthService } from './auth';
import { UserInterface } from '../app/interfaces/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //private baseUrl = 'feedbacked.onrender.com';
  private baseUrl = 'localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  //Return full user
  getUser(userId: string): Observable<any> {
    return this.http.post(`http://${this.baseUrl}/get-user`, {
      userId,
    });
  }

  //Get all user clients
  getClients(userId: string): Observable<any> {
    return this.http.post(`http://${this.baseUrl}/get-clients`, {
      userId,
    });
  }

  //Get specific client
  getClient(userId: string, clientId: string): Observable<any> {
    console.log('client', clientId);
    return this.http.post(`http://${this.baseUrl}/get-client`, {
      userId,
      clientId,
    });
  }

  //New client
  addClient({ userId, clientEmail, clientName, clientUrl }: newClient) {
    return this.http.post(`http://${this.baseUrl}/add-client`, {
      userId,
      clientEmail,
      clientName,
      clientUrl,
    });
  }

  //Project completed
  clientCompleted(userId: string, clientEmail: string, newStatus: string) {
    return this.http.post(`http://${this.baseUrl}/update-client-status`, {
      userId: userId,
      clientEmail,
      newStatus,
    });
  }

  //depleted
  // deleteKey(userId: string, clientEmail: string, key: string) {
  //   return this.http.post(`http://${this.baseUrl}/delete-key`, {
  //     userId,
  //     clientEmail,
  //     key,
  //   });
  // }

  // addKey(userId: string, clientEmail: string, clientName: string) {
  //   return this.http.post(`http://${this.baseUrl}/create-key`, {
  //     userId,
  //     clientEmail,
  //     clientName,
  //   });
  // }

  //Agency name
  updateAgencyName(userId: string, agencyName: string) {
    console.log(userId, agencyName);
    return this.http.post(`http://${this.baseUrl}/setUName`, {
      userId,
      agencyName,
    });
  }

  //Issue handlig

  getSpecificIssue(userId: string, issueId: string, clientId: string) {
    return this.http.get(
      `http://${this.baseUrl}/getFeedback/${userId}/${issueId}/${clientId}`
    );
  }

  resolveIssue(userId: string, issueId: string, clientId: string) {
    return this.http.put(`http://${this.baseUrl}/resolveFeedback`, {
      userId,
      issueId,
      clientId,
    });
  }

  //Handle integration tokens

  deleteToken = (token: string, userId: string) => {
    console.log('Deleting token');
    return this.http.delete<{ message: string; user: UserInterface }>(
      `http://${this.baseUrl}/deletepersonaltoken`,
      {
        body: { token, userId },
      }
    );
  };

  newToken = (token: string, integration: string, userId: string) => {
    return this.http.post<{ message: string; user: UserInterface }>(
      `http://${this.baseUrl}/createpersonaltoken`,
      {
        token,
        integration,
        userId,
      }
    );
  };

  addTarget = (
    owner: string,
    repo: string,
    userId: string,
    clientId: string
  ) => {
    return this.http.post<{
      message: string;
      integrationTarget: { owner: string; repo: string };
    }>(`http://${this.baseUrl}/addTarget`, {
      userId,
      clientId,
      owner,
      repo,
    });
  };
  removeTarget = (userId: string, clientId: string) => {
    return this.http.patch<{ message: string }>(
      `http://${this.baseUrl}/removeTarget`,
      {
        userId,
        clientId,
      }
    );
  };
}

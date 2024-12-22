import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newClient } from '../app/interfaces/Backend';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //private baseUrl = 'feedbacked.onrender.com';
  private baseUrl = 'localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUser(userId: string): Observable<any> {
    return this.http.post(`http://${this.baseUrl}/get-user`, {
      userId,
    });
  }

  getClients(userId: string): Observable<any> {
    return this.http.post(`http://${this.baseUrl}/get-clients`, {
      userId,
    });
  }

  getClient(userId: string, clientId: string): Observable<any> {
    console.log('client', clientId);
    return this.http.post(`http://${this.baseUrl}/get-client`, {
      userId,
      clientId,
    });
  }

  addClient({ userId, clientEmail, clientName, clientUrl }: newClient) {
    return this.http.post(`http://${this.baseUrl}/add-client`, {
      userId,
      clientEmail,
      clientName,
      clientUrl,
    });
  }
  clientCompleted(userId: string, clientEmail: string, newStatus: string) {
    return this.http.post(`http://${this.baseUrl}/update-client-status`, {
      userId: userId,
      clientEmail,
      newStatus,
    });
  }

  deleteKey(userId: string, clientEmail: string, key: string) {
    return this.http.post(`http://${this.baseUrl}/delete-key`, {
      userId,
      clientEmail,
      key,
    });
  }

  addKey(userId: string, clientEmail: string, clientName: string) {
    return this.http.post(`http://${this.baseUrl}/create-key`, {
      userId,
      clientEmail,
      clientName,
    });
  }

  updateAgencyName(userId: string, agencyName: string) {
    console.log(userId, agencyName);
    return this.http.post(`http://${this.baseUrl}/setUName`, {
      userId,
      agencyName,
    });
  }

  getSpecificIssue(userId: string, issueId: string) {
    const clientId = this.auth.getCurrentClientId();
    return this.http
      .get(
        `http://${this.baseUrl}/getFeedback/${userId}/${issueId}/${clientId}`
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}

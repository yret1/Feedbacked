import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //private baseUrl = 'feedbacked.onrender.com';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<any> {
    return this.http.post(`https://${this.baseUrl}/get-user`, {
      userId,
    });
  }

  getClients(userId: string): Observable<any> {
    return this.http.post(`https://${this.baseUrl}/get-clients`, {
      userId,
    });
  }

  getClient(userId: string, clientEmail: string): Observable<any> {
    return this.http.post(`https://${this.baseUrl}/get-client`, {
      userId,
      clientEmail,
    });
  }

  clientCompleted(studioId: string, clientEmail: string, newStatus: string) {
    return this.http.post(`https://${this.baseUrl}/update-client-status`, {
      studioId,
      clientEmail,
      newStatus,
    });
  }

  deleteKey(userId: string, clientEmail: string, key: string) {
    return this.http.post(`https://${this.baseUrl}/delete-key`, {
      userId,
      clientEmail,
      key,
    });
  }

  addKey(userId: string, clientEmail: string, clientName: string) {
    return this.http.post(`https://${this.baseUrl}/create-key`, {
      userId,
      clientEmail,
      clientName,
    });
  }
}

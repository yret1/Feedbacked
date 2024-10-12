import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = 'feedbacked.onrender.com';

  constructor(private http: HttpClient) {}

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
}

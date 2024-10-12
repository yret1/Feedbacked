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

  getClient(studioId: string, clientEmail: string): Observable<any> {
    return this.http.post(`https://${this.baseUrl}/client`, {
      studioId,
      clientEmail,
    });
  }
}

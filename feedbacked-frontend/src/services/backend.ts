import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = 'feedbacked.onrender.com';

  constructor(private http: HttpClient) {}

  getClients(studioId: string): Observable<any> {
    const clients = this.http.post(`https://${this.baseUrl}/clients`, {
      studioId,
    });
    console.log(clients);

    return clients;
  }

  getClient(studioId: string, clientEmail: string): Observable<any> {
    return this.http.post(`https://${this.baseUrl}/client`, {
      studioId,
      clientEmail,
    });
  }
}

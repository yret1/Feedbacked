import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newClient } from '../app/interfaces/Backend';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //private baseUrl = 'feedbacked.onrender.com';
  private baseUrl = 'localhost:3000';

  constructor(private http: HttpClient) {}

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

  getClient(userId: string, clientEmail: string): Observable<any> {
    return this.http.post(`http://${this.baseUrl}/get-client`, {
      userId,
      clientEmail,
    });
  }

  addClient = async ({
    userId,
    clientEmail,
    clientName,
    clientUrl,
  }: newClient) => {
    try {
      const request = await this.http.post(
        `http://${this.baseUrl}/add-client`,
        {
          userId,
          clientEmail,
          clientName,
          clientUrl,
        }
      );

      if (request) {
      } else {
      }
    } catch (error) {}
  };
  clientCompleted(userId: string, clientEmail: string, newStatus: string) {
    return this.http.post(`http://${this.baseUrl}/update-client-status`, {
      studioId: userId,
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
}

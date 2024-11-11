import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../app/interfaces/Authmodel';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private token?: string;

  //Todo: Change this to actual url in .env
  private baseUrl = 'feedbacked.onrender.com';
  private authenthicated = new Subject<boolean>();

  getAuthenthicated() {
    return this.authenthicated.asObservable();
  }

  getToken() {
    return this.token;
  }

  signUpUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };
    console.log(authdata);

    this.http
      .post(`https://${this.baseUrl}/sign-up`, authdata)
      .subscribe((response) => {
        console.log(response);
      });
  }

  signInUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    console.log(authdata);

    this.http
      .post<{ token: string }>(`https://${this.baseUrl}/login`, authdata)
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          this.authenthicated.next(true);
        }
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../app/interfaces/Authmodel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private token?: string;

  private baseUrl = 'feedbacked.onrender.com';

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
      });
  }
}

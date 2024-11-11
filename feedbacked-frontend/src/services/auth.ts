import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../app/interfaces/Authmodel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'feedbacked.onrender.com';

  signUpUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    this.http
      .post(`https://${this.baseUrl}/sign-up`, authdata)
      .subscribe((response) => {
        console.log(response);
      });
  }
}

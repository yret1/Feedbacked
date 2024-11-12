import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../app/interfaces/Authmodel';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    // Check if user is already logged in
    const savedUserId = localStorage.getItem('userID');
    const savedToken = localStorage.getItem('token');

    if (savedUserId && savedToken) {
      if (savedUserId !== 'undefined' && savedToken !== 'undefined') {
        this.userID.next(savedUserId);
        this.token = savedToken;
        this.authenthicated.next(true);
        console.log('Restored session:', {
          userId: savedUserId,
          token: savedToken,
        });
      }
    }
  }

  private token: string | null = localStorage.getItem('token');
  private baseUrl = 'feedbacked.onrender.com';
  private authenthicated = new BehaviorSubject<boolean>(false);
  private userID = new BehaviorSubject<string | null>(null);

  getId() {
    return this.userID.asObservable();
  }

  getCurrentUserId() {
    return this.userID.getValue();
  }

  getAuthenthicated() {
    return this.authenthicated.asObservable();
  }

  getToken() {
    return this.token;
  }

  signUpUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    this.http
      .post(`https://${this.baseUrl}/sign-up`, authdata)
      .subscribe((response) => {
        console.log(response);
      });
  }

  signInUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    this.http
      .post<{ token: string; userId: string }>(
        `https://${this.baseUrl}/login`,
        authdata
      )
      .subscribe({
        next: (response) => {
          console.log('ResponseLogin', response);

          this.token = response.token;
          localStorage.setItem('token', this.token);
          localStorage.setItem('userID', response.userId);
          this.userID.next(response.userId);
          this.authenthicated.next(true);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.authenthicated.next(false);
        },
      });
  }

  logout() {
    this.token = null;
    this.userID.next(null);
    this.authenthicated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }
}

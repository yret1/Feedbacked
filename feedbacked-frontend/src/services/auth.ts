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
      }
    }
  }

  private token: string | null = localStorage.getItem('token');
  //private baseUrl = 'feedbacked.onrender.com';
  private baseUrl = 'localhost:3000';
  private authenthicated = new BehaviorSubject<boolean>(false);
  private userID = new BehaviorSubject<string | null>(null);

  private currentClientId = new BehaviorSubject<string | null>(null);

  getId() {
    return this.userID.asObservable();
  }

  getCurrentClientId() {
    console.log(this.currentClientId.getValue());
    return this.currentClientId.getValue();
  }

  setCurrentClient(id: string) {
    this.currentClientId.next(id);
    localStorage.setItem('client', id);
    console.log('Current client', id);
  }

  getCurrentUserId() {
    return this.userID.getValue();
  }

  getAuthenthicated() {
    console.log('getAuthenthicated', this.authenthicated.asObservable());
    return this.authenthicated.asObservable();
  }

  getIsAuthenthicated() {
    return this.authenthicated.getValue();
  }

  getToken() {
    return this.token;
  }

  signUpUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    this.http
      .post(`http://${this.baseUrl}/sign-up`, authdata)
      .subscribe((response) => {});
  }

  signInUser(email: string, password: string) {
    const authdata: AuthModel = { email: email, password: password };

    this.http
      .post<{ token: string; userId: string }>(
        `http://${this.baseUrl}/login`,
        authdata
      )
      .subscribe({
        next: (response) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          localStorage.setItem('userID', response.userId);
          this.userID.next(response.userId);
          this.authenthicated.next(true);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          alert('Incorrect credentials. Please try again.');
          this.authenthicated.next(false);
          return false;
        },
      });
  }

  logout() {
    this.token = null;
    this.userID.next(null);
    this.authenthicated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.router.navigate(['/signin']);
  }
}

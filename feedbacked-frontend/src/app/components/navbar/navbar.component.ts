import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}

  navVersion: 'Landing' | 'Dash' | 'Client' = 'Landing';

  routeTo = '/';
  private routerSubscription: Subscription | undefined;

  scrolled = false;

  signout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.routeChecker();
      });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  routeChecker() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard')) {
      this.navVersion = 'Dash';
      this.routeTo = '/dashboard';
    } else if (currentUrl.includes('/user')) {
      this.navVersion = 'Client';
      this.routeTo = '/dashboard';
    } else {
      this.navVersion = 'Landing';
      this.routeTo = '/';
    }
    console.log('Current navVersion:', this.navVersion);
  }
}

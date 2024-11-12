import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}

  navVersion: 'Landing' | 'Dash' | 'Client' = 'Landing';

  routeTo = '/';
  private routerSubscription: Subscription | undefined;

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

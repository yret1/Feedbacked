import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  navVersion: 'Landing' | 'Dash' | 'Client' = 'Landing';

  private routerSubscription: Subscription | undefined;

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
    } else if (currentUrl.includes('/user')) {
      this.navVersion = 'Client';
    } else {
      this.navVersion = 'Landing';
    }
    console.log('Current navVersion:', this.navVersion);
  }
}

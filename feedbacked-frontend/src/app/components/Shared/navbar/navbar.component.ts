import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth';
import { CommonModule, Location } from '@angular/common';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('staggerItems', [
      transition(':enter', [
        query(
          'li, button',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger(60, [
              animate(
                '0.2s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _location: Location
  ) {}

  navVersion: 'Landing' | 'Dash' | 'Client' | 'Auth' = 'Landing';

  links = [
    { name: 'Why', route: '/why' },
    { name: 'Integrations', route: '/integrations' },
    { name: 'Pricing', route: '/pricing' },
    { name: 'Contact', route: '/contact' },
  ];

  dashlinks = [
    { name: 'Projects', route: '/dashboard' },
    { name: 'Settings', route: '/dashboard/settings' },
  ];

  routeTo = '/';
  private routerSubscription: Subscription | undefined;

  scrolled = false;
  open = false;

  signout() {
    this.authService.logout();
    this.open = false;
  }

  activeRoute(route: string): boolean {
    if (this.router.url.includes(route)) {
      return true;
    }

    return false;
  }

  signedin() {
    return this.authService.getIsAuthenthicated();
  }

  goBack() {
    this._location.back();
  }

  openMenu() {
    this.open = !this.open;
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
      this.scrolled = window.scrollY > 20;
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
    } else if (
      currentUrl.includes('/signin') ||
      currentUrl.includes('/signup')
    ) {
      this.navVersion = 'Auth';
      this.routeTo = '/';
    } else {
      this.navVersion = 'Landing';
      this.routeTo = '/';
    }
    console.log('Current navVersion:', this.navVersion);
  }
}

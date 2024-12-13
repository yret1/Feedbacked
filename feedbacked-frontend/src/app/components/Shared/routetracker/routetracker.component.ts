import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-routetracker',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './routetracker.component.html',
  styleUrl: './routetracker.component.scss',
})
export class RoutetrackerComponent implements OnInit {
  constructor(private router: Router) {}

  private routerSubscription: Subscription | undefined;

  route = '';

  routeChecker() {
    const currentUrl = this.router.url;
    switch (true) {
      case currentUrl.endsWith('/dashboard'):
        this.route = 'Projects';
        break;
      case currentUrl.endsWith('/create'):
        this.route = 'Create new project';
        break;
      case currentUrl.endsWith('/client'):
        this.route = 'Client';
        break;
      case currentUrl.endsWith('/settings'):
        this.route = 'Settings';
        break;
      case currentUrl.endsWith('/team'):
        this.route = 'Handle team';
        break;

      default:
        this.route = 'Landing';
    }
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
}

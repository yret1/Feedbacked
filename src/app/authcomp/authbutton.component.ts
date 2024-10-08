import { Component, Input } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template:
    '<button [className]="class"  (click)="auth.loginWithRedirect()">Log in</button>',
  standalone: true,
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  @Input() class: string = '';
  constructor(public auth: AuthService) {}
}

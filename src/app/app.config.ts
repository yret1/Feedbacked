import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'localhost:4200',
      clientId: 'G5vr8hbauoirsINJQQAZgn9d7jQMyupX',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
};

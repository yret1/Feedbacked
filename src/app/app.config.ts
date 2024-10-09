import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-5eli3086mapouaf4.eu.auth0.com',
      clientId: 'G5vr8hbauoirsINJQQAZgn9d7jQMyupX',
      authorizationParams: {
        redirect_uri: 'localhost:4200',
      },
    }),
  ],
};

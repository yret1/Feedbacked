import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

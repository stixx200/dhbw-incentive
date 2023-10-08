import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { AppHttpClient } from './shared/http-client.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: 'API_BASEURL', useValue: 'http://127.0.0.1:4500/api' },
    provideAnimations(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    AuthService,
    UserService,
    AppHttpClient,
    provideAnimations(),
    provideAnimations()
],
};

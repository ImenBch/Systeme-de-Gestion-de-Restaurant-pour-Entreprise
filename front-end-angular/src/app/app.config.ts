import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {MAT_DATE_LOCALE} from "@angular/material/core";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8180',
          realm: 'SpringBootKeycloak',
          clientId: 'client'
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
              window.location.origin + '/assets/silent-check-sso.html'
        },
        // enable Bearer interceptor
        enableBearerInterceptor: true,
        // Prefix for the Bearer token
        bearerPrefix: 'Bearer',
      });
}
// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}
// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakBearerInterceptor,
    multi: true
};

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideAnimationsAsync(),
      provideHttpClient(withInterceptorsFromDi()),
      KeycloakInitializerProvider,
      KeycloakBearerInterceptorProvider,
      KeycloakService,
      {provide: MAT_DATE_LOCALE, useValue: 'fr'}
  ]
};

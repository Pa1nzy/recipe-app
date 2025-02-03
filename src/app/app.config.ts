import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import for HTTP client

import { appRoutes } from './app.routes'; // Correctly importing appRoutes

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes), // Use appRoutes instead of routes
    provideHttpClient(withInterceptorsFromDi()), // Add HTTP client configuration
  ],
};

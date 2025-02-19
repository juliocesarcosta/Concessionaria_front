import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig & { apiUrl: string } = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ],
  apiUrl: 'http://localhost:8080/api/clientes' // Defina a URL da API
};





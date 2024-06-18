import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { credentialsInterceptor, serverErrorInterceptor } from '@lib/interceptors';
import { routes } from './app.routes';
import { prodInterceptor } from '@lib/interceptors/prod.interceptor';
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([serverErrorInterceptor, credentialsInterceptor, prodInterceptor])),
    ],
};

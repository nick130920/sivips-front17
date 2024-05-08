import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@lib/services';
import { environment } from '@env/environment';

/**
 * Interceptor that adds an Jsession Cookie to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const jsessionInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const isRequestAuthorized = authService.isAuthenticated && req.url.startsWith(environment.apiUrl);

    if (isRequestAuthorized) {
        const clonedRequest = req.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Authorization`,
            },
        });

        return next(clonedRequest);
    }

    return next(req);
};

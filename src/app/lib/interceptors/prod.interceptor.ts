import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

/**
 * Interceptor that adds an Authorization header to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const prodInterceptor: HttpInterceptorFn = (request, next) => {
    const isRequestAuthorized = request.url.startsWith(environment.apiUrl);

    if (isRequestAuthorized) {
        const clonedRequest = request.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Angular: `true`,
            },
        });
        console.log(clonedRequest);

        return next(clonedRequest);
    }

    return next(request);
};

import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor that adds a Jsession Cookie to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const jsessionInterceptor: HttpInterceptorFn = (request, next) => {
    const cloned = request.clone({
        withCredentials: true,
    });
    return next(cloned);
};

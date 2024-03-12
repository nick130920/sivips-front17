import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '@lib/services';
/**
 * Interceptor that handles server errors.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.status)) {
                if (!error.error) {
                    Swal.fire('Oopps', 'No tienes permisos para realizar esta acción', 'success');
                }
                authService.logout();
                router.navigate(['/auth/login']);
            }

            return throwError(() => error);
        }),
    );
};

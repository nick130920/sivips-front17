import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiUrl: string = environment.apiUrl;
    isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));
    isModo$ = new BehaviorSubject<boolean>(!!storage.getItem('mode'));

    constructor(private _http: HttpClient) {}
    get isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    get isModoAdmin(): boolean {
        const storedMode = sessionStorage.getItem('mode');
        if (storedMode) {
            this.isModo$.next(Boolean(storedMode));
        } else {
            this._http.get<boolean>(`${this._apiUrl}/api/mode`).subscribe((mode) => {
                sessionStorage.setItem('mode', String(mode));
                this.isModo$.next(mode);
            });
        }
        return this.isModo$.getValue();
    }

    login(username: string, password: string): Observable<never> {
        const body = new HttpParams().set('username', username).set('password', password);

        const url = `${this._apiUrl}/login`;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http
            .post(url, body.toString(), {
                headers,
                observe: 'response',
            })
            .pipe(
                tap((response) => {
                    console.log(response);
                    // Extrae los encabezados de la respuesta
                    const responseHeaders = response.headers;
                    // Extrae el token del encabezado deseado (en este caso, 'authorization')
                    const token = responseHeaders.get('Authorization');
                    if (token) {
                        const decodedToken = jwtDecode(token);
                        console.log(decodedToken);
                        storage.setItem('appSession', decodedToken);
                        this.isAuthenticated$.next(true);
                    } else {
                        console.error('Token no encontrado en los encabezados de la respuesta');
                    }
                }),
            ) as Observable<never>;
    }
    secondLogin(password: string): Observable<never> {
        const url = `${this._apiUrl}/segundopassword`;

        return this._http.post(url, password, { observe: 'response' }).pipe(
            tap((response) => {
                // Extrae los encabezados de la respuesta
                const responseHeaders = response.headers;

                // Extrae el token del encabezado deseado (en este caso, 'authorization')
                const token = responseHeaders.get('Authorization');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken);
                    storage.setItem('appSession', decodedToken);
                    this.isAuthenticated$.next(true);
                } else {
                    console.error('Token no encontrado en los encabezados de la respuesta');
                }
            }),
        ) as Observable<never>;
    }

    logout(): void {
        storage.removeItem('appSession');
        this.isAuthenticated$.next(false);
    }
}

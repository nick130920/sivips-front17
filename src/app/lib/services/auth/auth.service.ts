import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiUrl: string = environment.apiUrl;
    isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));
    constructor(private _http: HttpClient) {}
    get isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    login(username: string, password: string): void {
        const body = new HttpParams().set('username', username).set('password', password);

        const url = `${this._apiUrl}/login`;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        this._http
            .post(url, body.toString(), {
                headers,
                observe: 'response',
            })
            .pipe(
                tap((response) => {
                    console.log(response);
                    // Extrae los encabezados de la respuesta
                    const responseHeaders = response.headers;
                    console.log(responseHeaders);

                    // Extrae el token del encabezado deseado (en este caso, 'authorization')
                    const token = responseHeaders.get('Authorization');

                    if (token) {
                        console.log('Token extraído:', token);
                        // Utiliza el token para acciones adicionales (almacenamiento seguro, enviar a otra solicitud, etc.)
                    } else {
                        console.error('Token no encontrado en los encabezados de la respuesta');
                        // Maneja el caso en el que el token esté ausente
                    }
                }),
            )
            .subscribe();
        storage.setItem('appSession', { user: 'some-user-id', token: 'abc' });
        this.isAuthenticated$.next(true);
    }

    logout(): void {
        storage.removeItem('appSession');
        this.isAuthenticated$.next(false);
    }
}

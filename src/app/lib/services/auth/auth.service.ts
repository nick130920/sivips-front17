import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiUrl: string = environment.apiUrl;

    isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isModo$ = new BehaviorSubject<boolean>(!!storage.getItem('mode'));

    constructor(private _http: HttpClient) {}

    get isLoggedIn(): boolean {
        this._http.get<boolean>(`${this._apiUrl}/api/session`).subscribe((data) => {
            this.isLoggedIn$.next(data);
        });
        return this.isLoggedIn$.getValue();
    }

    get isModoAdmin(): boolean {
        const isStoredMode = storage.getItem<'mode'>('mode');
        if (isStoredMode != null) {
            this.isModo$.next(isStoredMode);
        } else {
            this._http.get<boolean>(`${this._apiUrl}/api/mode`).subscribe((data) => {
                storage.setItem<'mode'>('mode', data);
                this.isModo$.next(data);
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
                }),
            ) as Observable<never>;
    }
    secondLogin(password: string): Observable<never> {
        const url = `${this._apiUrl}/segundopassword`;

        return this._http.post(url, password, { observe: 'response' }).pipe(
            tap((response) => {
                console.log(response);
            }),
        ) as Observable<never>;
    }

    logout(): void {}
}

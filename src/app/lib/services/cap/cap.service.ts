import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapItem } from '@lib/interfaces';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class CapService {
    private _apiUrl: string = environment.apiUrl;
    items = signal<CapItem[]>([]);
    constructor(private _http: HttpClient) {}

    getItems(): Observable<CapItem[]> {
        return this._http.get<CapItem[]>(this._apiUrl + '/api/cap/requisitos-minimos');
    }

    addItem(item: CapItem): Observable<CapItem> {
        return this._http.post<CapItem>(this._apiUrl + '/api/cap/crear-requisito', item);
    }

    updateItem(item: CapItem): Observable<CapItem> {
        return this._http.post<CapItem>(this._apiUrl + '/api/cap/actualizar-requisito', item); // Asegúrate de que el objeto tenga una propiedad `id`
    }

    deleteItem(id: number): Observable<void> {
        return this._http.delete<void>(`${this._apiUrl}/${id}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapItem } from '@lib/interfaces';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class CapService {
    private _apiUrl: string = environment.apiUrl;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor(private http: HttpClient) {}

    getItems(): Observable<CapItem[]> {
        return this.http.get<CapItem[]>(this._apiUrl);
    }

    addItem(item: CapItem): Observable<CapItem> {
        return this.http.post<CapItem>(this._apiUrl, item);
    }

    updateItem(item: CapItem): Observable<CapItem> {
        return this.http.put<CapItem>(`${this._apiUrl}/${item.id}`, item); // Asegúrate de que el objeto tenga una propiedad `id`
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this._apiUrl}/${id}`);
    }
}

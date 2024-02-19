import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarChangerService {
    private _buttonClicked = new Subject<void>();

    buttonClicked$ = this._buttonClicked.asObservable();
    emitButtonClick(): void {
        this._buttonClicked.next();
    }
}

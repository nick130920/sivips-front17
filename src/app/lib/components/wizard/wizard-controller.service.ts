import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WizardControllerService {
    private _nextStep = new Subject<void>();
    nextStep$ = this._nextStep.asObservable();

    private _previousStep = new Subject<void>();
    previousStep$ = this._previousStep.asObservable();
    tabSignal = signal(1);
    nextStep(): void {
        this._nextStep.next();
    }

    previousStep(): void {
        this._previousStep.next();
    }
}

import { Component } from '@angular/core';
import { AuthService } from '@lib/services';

import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    private _isAuthenticated = false;
    isMallSide = false;

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    constructor(
        private _authService: AuthService,
        private _sidebarService: SidebarChangerService,
    ) {
        this._authService.isAuthenticated$.subscribe((isAuthenticated) => {
            this._isAuthenticated = isAuthenticated;
        });
        this._sidebarService.buttonClicked$.subscribe(() => {
            this.isMallSide = !this.isMallSide;
        });
    }
}

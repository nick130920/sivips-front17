import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { SidebarComponent } from '@lib/components';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { SidebarComponent } from '@lib/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './app.component.html',
    providers: [],
})
export class AppComponent {
    private _isAuthenticated = false;
    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }
    constructor(private _authService: AuthService) {
        this._authService.isAuthenticated$.subscribe((isAuthenticated) => {
            this._isAuthenticated = isAuthenticated;
        });
        console.log('AppComponent', this._isAuthenticated);
    }
}

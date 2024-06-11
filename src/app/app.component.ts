import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private _authService: AuthService) {
        this._authService.isModoAdmin;
    }
}

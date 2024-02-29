import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';
import { getFaculty } from '@lib/utils';
import { Faculty } from '@lib/interfaces';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';

@Component({
    standalone: true,
    imports: [CommonModule, HlmButtonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    @Input() returnUrl!: string;
    faculty!: Faculty;

    constructor(
        private readonly _router: Router,
        private _authService: AuthService,
    ) {}

    login(): void {
        this._authService.login();
        this._router.navigate(['/home']);
    }

    ngOnInit(): void {
        this.faculty = getFaculty(1);
    }
}

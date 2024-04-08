import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';
import { getFaculty } from '@lib/utils';
import { Faculty } from '@lib/interfaces';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, ButtonModule, RippleModule],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    @Input() returnUrl!: string;
    faculty!: Faculty;

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required.bind(Validators)),
        password: new FormControl('', Validators.required.bind(Validators)),
    });

    constructor(
        private readonly _router: Router,
        private _authService: AuthService,
    ) {
        console.log('LoginComponent');
    }

    firstStepLogin(): void {
        if (this.loginForm.valid) {
            this._authService.login(this.loginForm.value.username as string, this.loginForm.value.password as string);
        }
        this._router.navigate(['/home']);
    }

    secondStepLogin(): void {
        // this._authService.login();
        this._router.navigate(['/home']);
    }

    ngOnInit(): void {
        this.faculty = getFaculty(1);
    }
}

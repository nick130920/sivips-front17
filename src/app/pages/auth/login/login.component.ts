import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';
import { getFaculty } from '@lib/utils';
import { Faculty } from '@lib/interfaces';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule, HlmButtonModule, NgOptimizedImage, ReactiveFormsModule],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    @Input() returnUrl!: string;
    faculty!: Faculty;
    loginForm = new FormGroup({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        username: new FormControl('', [Validators.required]),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        password: new FormControl('', [Validators.required]),
    });
    constructor(
        private readonly _router: Router,
        private _authService: AuthService,
    ) {}

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
        initFlowbite();
        this.faculty = getFaculty(1);
    }
}

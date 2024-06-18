import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';
import { Wizard } from '@lib/interfaces';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { initFlowbite } from 'flowbite';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WizardControllerService } from '@lib/components/wizard/wizard-controller.service';
import { WizardComponent } from '@lib/components/wizard/wizard.component';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
    standalone: true,
    imports: [CommonModule, HlmButtonModule, NgOptimizedImage, ReactiveFormsModule, WizardComponent],
    templateUrl: './login.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                // is alias to 'void => *'
                style({ opacity: 0 }),
                animate(2000, style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class LoginComponent implements OnInit {
    @Input() returnUrl!: string;
    public wizardService = inject(WizardControllerService);
    protected authService = inject(AuthService);
    public steps: Wizard[] = [
        { title: 'Paso 1', description: 'Primera contraseña', clickable: true },
        { title: 'Paso 2', description: 'Segunda Contraseña', clickable: true },
    ];

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required.bind(Validators)),
        password: new FormControl('', Validators.required.bind(Validators)),
    });

    secondLoginForm = new FormGroup({
        password: new FormControl('', Validators.required.bind(Validators)),
    });

    constructor(private readonly _router: Router) {}
    firstStepLogin(): void {
        if (this.loginForm.valid) {
            this.authService
                .login(this.loginForm.value.username as string, this.loginForm.value.password as string)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        Swal.fire('Oopps', error.error, 'error');

                        return throwError(() => error);
                    }),
                )
                .subscribe(() => {
                    if (this.authService.isModoAdmin) {
                        this.nextStep();
                    } else {
                        this._router.navigate(['/dashboard']);
                    }
                });
        }
    }

    secondStepLogin(): void {
        if (this.secondLoginForm.valid) {
            this.authService
                .secondLogin(this.secondLoginForm.value.password as string)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        Swal.fire('Oopps', error.error, 'error');

                        return throwError(() => error);
                    }),
                )
                .subscribe(() => {
                    if (this.authService.isModoAdmin) {
                        this._router.navigate(['/dashboard']);
                    }
                });
        }
    }

    ngOnInit(): void {
        initFlowbite();
        this.authService.loggedIn();
    }

    nextStep(): void {
        this.wizardService.nextStep();
    }

    previousStep(): void {
        this.wizardService.previousStep();
    }
}

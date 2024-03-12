import { Component } from '@angular/core';
import { WizardComponent } from '@lib/components/wizard/wizard.component';
import { Wizard } from '@lib/interfaces';
import { WizardControllerService } from '@lib/components/wizard/wizard-controller.service';

@Component({
    selector: 'app-token',
    standalone: true,
    imports: [WizardComponent],
    templateUrl: './token.component.html',
})
export class TokenComponent {
    public steps: Wizard[] = [
        { title: 'Step 1', description: 'This is step 1', clickable: false },
        { title: 'Step 2', description: 'This is step 2', clickable: false },
        { title: 'Step 3', description: 'This is step 3', clickable: false },
        { title: 'Step 4', description: 'This is step 4', clickable: false },
        { title: 'Step 5', description: 'This is step 5', clickable: false },
        { title: 'Step 6', description: 'This is step 6', clickable: false },
    ];

    constructor(private _wizardController: WizardControllerService) {}

    nextStep(): void {
        this._wizardController.nextStep();
    }

    previousStep(): void {
        this._wizardController.previousStep();
    }
}

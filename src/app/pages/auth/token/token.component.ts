import { Component } from '@angular/core';
import { WizardComponent } from '@lib/components/wizard/wizard.component';
import { WizardStep } from '@lib/interfaces';
import { WizardControllerService } from '@lib/components/wizard/wizard-controller.service';
@Component({
    selector: 'app-token',
    standalone: true,
    imports: [WizardComponent],
    templateUrl: './token.component.html',
})
export class TokenComponent {
    public steps: WizardStep[] = [
        { title: 'Step 1', description: 'This is step 1' },
        { title: 'Step 2', description: 'This is step 2' },
        { title: 'Step 3', description: 'This is step 3' },
        { title: 'Step 4', description: 'This is step 4' },
        { title: 'Step 5', description: 'This is step 5' },
        { title: 'Step 6', description: 'This is step 6' },
    ];
    constructor(private _wizardController: WizardControllerService) {}
    nextStep(): void {
        this._wizardController.nextStep();
    }
    previousStep(): void {
        this._wizardController.previousStep();
    }
}

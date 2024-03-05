import { Component } from '@angular/core';
import { WizardComponent } from '@lib/components/wizard/wizard.component';
import { WizardStep } from '@lib/interfaces';
@Component({
    selector: 'app-token',
    standalone: true,
    imports: [WizardComponent],
    templateUrl: './token.component.html',
})
export class TokenComponent {
    public steps: WizardStep[] = [
        { title: 'Step 1', description: 'This is step 1', completed: true },
        { title: 'Step 2', description: 'This is step 2', completed: true },
        { title: 'Step 3', description: 'This is step 3', completed: true },
        { title: 'Step 4', description: 'This is step 4', completed: true },
        { title: 'Step 5', description: 'This is step 5', completed: true },
        { title: 'Step 6', description: 'This is step 6', completed: false, isCurrent: true },
    ];
    constructor() {
        console.log('TokenComponent', this.steps);
    }
}

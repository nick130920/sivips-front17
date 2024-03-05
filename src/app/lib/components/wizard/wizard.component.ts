import { Component, Input, OnInit } from '@angular/core';
import { EmptyDotComponent } from '@lib/components/wizard/empty-dot/empty-dot.component';
import { SelectedPointComponent } from '@lib/components/wizard/selected-point/selected-point.component';
import { FullDotComponent } from '@lib/components/wizard/full-dot/full-dot.component';
import { WizardStep } from '@lib/interfaces';
import { CommonModule } from '@angular/common';
import { WizardControllerService } from '@lib/components/wizard/wizard-controller.service';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [EmptyDotComponent, SelectedPointComponent, FullDotComponent, CommonModule],
    templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit {
    @Input() public steps: WizardStep[] = [];

    constructor(private _wizardController: WizardControllerService) {
        this._wizardController.nextStep$.subscribe(() => this.nextStep());
        this._wizardController.previousStep$.subscribe(() => this.previousStep());
    }

    ngOnInit(): void {
        this.steps = this.steps.map((step, index) => ({ ...step, isCompleted: false, isCurrent: index === 0 }));
    }

    nextStep(): void {
        const currentStepIndex = this.steps.findIndex((step) => step.isCurrent);
        if (currentStepIndex === -1) {
            return;
        }
        if (currentStepIndex === this.steps.length - 1) {
            this.steps[currentStepIndex].isCurrent = false;
            this.steps[currentStepIndex].isCompleted = true;
            return;
        }
        if (currentStepIndex < this.steps.length - 1) {
            this.steps[currentStepIndex].isCurrent = false;
            this.steps[currentStepIndex].isCompleted = true;
            this.steps[currentStepIndex + 1].isCurrent = true;
            return;
        }
    }

    previousStep(): void {
        const currentStepIndex = this.steps.findIndex((step) => step.isCurrent);
        if (currentStepIndex > 0) {
            this.steps[currentStepIndex].isCurrent = false;
            this.steps[currentStepIndex - 1].isCurrent = true;
            this.steps[currentStepIndex - 1].isCompleted = false;
            return;
        }
    }
}

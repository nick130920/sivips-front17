import { Component, Input, OnInit } from '@angular/core';
import { EmptyDotComponent } from '@lib/components/wizard/empty-dot/empty-dot.component';
import { SelectedPointComponent } from '@lib/components/wizard/selected-point/selected-point.component';
import { FullDotComponent } from '@lib/components/wizard/full-dot/full-dot.component';
import { Wizard, WizardStep } from '@lib/interfaces';
import { CommonModule } from '@angular/common';
import { WizardControllerService } from '@lib/components/wizard/wizard-controller.service';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [EmptyDotComponent, SelectedPointComponent, FullDotComponent, CommonModule],
    templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit {
    @Input() public steps: Wizard[] = [];
    public stepsArray: WizardStep[] = [];

    constructor(private _wizardController: WizardControllerService) {
        this._wizardController.nextStep$.subscribe(() => this.nextStep());
        this._wizardController.previousStep$.subscribe(() => this.previousStep());
    }

    ngOnInit(): void {
        this.stepsArray = this.steps.map((step, index) => ({
            ...step,
            id: index + 1,
            isCompleted: false,
            isCurrent: index === 0,
        }));
        console.log(this.stepsArray);
    }

    nextStep(): void {
        const currentStepIndex = this.stepsArray.findIndex((step: WizardStep) => step.isCurrent);
        if (currentStepIndex === -1) {
            return;
        }
        if (currentStepIndex === this.stepsArray.length - 1) {
            this.stepsArray[currentStepIndex].isCurrent = false;
            this.stepsArray[currentStepIndex].isCompleted = true;
            return;
        }
        if (currentStepIndex < this.stepsArray.length - 1) {
            this.stepsArray[currentStepIndex].isCurrent = false;
            this.stepsArray[currentStepIndex].isCompleted = true;
            this.stepsArray[currentStepIndex + 1].isCurrent = true;
            this._wizardController.tabSignal.set(this.stepsArray[currentStepIndex + 1].id);
            return;
        }
    }

    previousStep(): void {
        const currentStepIndex = this.stepsArray.findIndex((step) => step.isCurrent);
        if (currentStepIndex > 0) {
            this.stepsArray[currentStepIndex].isCurrent = false;
            this.stepsArray[currentStepIndex - 1].isCurrent = true;
            this.stepsArray[currentStepIndex - 1].isCompleted = false;
            return;
        }
        this._wizardController.tabSignal.set(currentStepIndex);
    }

    handleClickOnStep(step: number): void {
        const currentStep = this.stepsArray.find((s: WizardStep) => s.id === step);
        if (currentStep) {
            if (currentStep.clickable) {
                this.stepsArray.forEach((s) => {
                    s.isCurrent = s.id === currentStep.id;
                    s.isCompleted = s.id < currentStep.id;
                });
                this._wizardController.tabSignal.set(currentStep.id);
            }
        }
    }
}

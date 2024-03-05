import { Component, Input } from '@angular/core';
import { WizardStep } from '@lib/interfaces';

@Component({
    selector: 'app-selected-point',
    standalone: true,
    imports: [],
    templateUrl: './selected-point.component.html',
})
export class SelectedPointComponent {
    @Input() public step: WizardStep | undefined;
    public showTooltip = false;

    onMouseOver(): void {
        this.showTooltip = !this.showTooltip;
    }
}

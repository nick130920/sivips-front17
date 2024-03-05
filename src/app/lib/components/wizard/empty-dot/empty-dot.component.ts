import { Component, Input } from '@angular/core';
import { WizardStep } from '@lib/interfaces';

@Component({
    selector: 'app-empty-dot',
    standalone: true,
    imports: [],
    templateUrl: './empty-dot.component.html',
})
export class EmptyDotComponent {
    public showTooltip = false;
    @Input() public step: WizardStep | undefined;
    onMouseOver(): void {
        this.showTooltip = !this.showTooltip;
    }
}

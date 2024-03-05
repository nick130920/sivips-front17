import { Component, Input } from '@angular/core';
import { WizardStep } from '@lib/interfaces';
@Component({
    selector: 'app-full-dot',
    standalone: true,
    templateUrl: './full-dot.component.html',
})
export class FullDotComponent {
    public showTooltip = false;
    @Input() public step: WizardStep | undefined;
    onMouseOver(): void {
        this.showTooltip = !this.showTooltip;
    }
}

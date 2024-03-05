import { Component, Input, OnInit } from '@angular/core';
import { EmptyDotComponent } from '@lib/components/wizard/empty-dot/empty-dot.component';
import { SelectedPointComponent } from '@lib/components/wizard/selected-point/selected-point.component';
import { FullDotComponent } from '@lib/components/wizard/full-dot/full-dot.component';
import { WizardStep } from '@lib/interfaces';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [EmptyDotComponent, SelectedPointComponent, FullDotComponent, CommonModule],
    templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit {
    @Input() public steps: WizardStep[] = [];

    ngOnInit(): void {
        console.log('WizardComponent', this.steps);
    }
}

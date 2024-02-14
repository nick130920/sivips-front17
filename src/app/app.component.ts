import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { provideIcons } from '@ng-icons/core';
import { radixChevronRight, radixEnvelopeClosed, radixSymbol } from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HlmButtonDirective,
        HlmSpinnerComponent,
        HlmIconComponent,
        HlmLabelDirective,
        HlmSwitchComponent,
        HlmInputDirective,
    ],
    templateUrl: './app.component.html',
    providers: [provideIcons({ radixChevronRight, radixEnvelopeClosed, radixSymbol })],
})
export class AppComponent implements OnInit {
    isAuthenticated$ = inject(AuthService).isAuthenticated;

    ngOnInit(): void {
        console.log('Theme:', this.isAuthenticated$);
    }
    xxx;
}

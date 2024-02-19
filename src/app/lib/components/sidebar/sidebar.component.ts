import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { HlmButtonDirective } from '@lib/ui/ui-button-helm/src';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { SidebarBigComponent } from '../sidebar-big/sidebar-big.component';
import { SidebarSmallComponent } from '../sidebar-small/sidebar-small.component';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HlmButtonDirective,
        BrnAccordionContentComponent,
        HlmIconComponent,
        SidebarBigComponent,
        SidebarSmallComponent,
    ],
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
    @ViewChild('sidebarBig') sidebar!: ElementRef<HTMLDivElement>;
    private _onSideChange: Subscription;
    isMallSide = false;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _sidebarService: SidebarChangerService,
    ) {
        this._onSideChange = this._sidebarService.buttonClicked$.subscribe(() => {
            this.onButtonClick();
        });
    }

    onButtonClick(): void {
        this.isMallSide = !this.isMallSide;
    }
}

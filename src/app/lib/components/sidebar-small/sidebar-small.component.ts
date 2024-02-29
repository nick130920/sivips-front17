import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pages } from '@lib/utils';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import { HlmAccordionModule } from '@lib/ui/ui-accordion-helm/src';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@lib/services';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';

@Component({
    selector: 'app-sidebar-small',
    standalone: true,
    imports: [
        CommonModule,
        BrnAccordionContentComponent,
        HlmAccordionModule,
        HlmButtonModule,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './sidebar-small.component.html',
})
export class SidebarSmallComponent {
    protected readonly pages = pages;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _sidebarService: SidebarChangerService,
    ) {}

    onBigSidebar(): void {
        this._sidebarService.emitButtonClick();
    }

    onClickSignOut(): void {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
    }
}

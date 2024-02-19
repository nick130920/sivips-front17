import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import {
    HlmAccordionContentDirective,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
} from '@lib/ui/ui-accordion-helm/src';
import { HlmButtonDirective } from '@lib/ui/ui-button-helm/src';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { pages } from '@lib/utils';
import { AuthService } from '@lib/services';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';

@Component({
    selector: 'app-sidebar-big',
    standalone: true,
    imports: [
        CommonModule,
        BrnAccordionContentComponent,
        HlmAccordionContentDirective,
        HlmAccordionDirective,
        HlmAccordionItemDirective,
        HlmAccordionTriggerDirective,
        HlmButtonDirective,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './sidebar-big.component.html',
})
export class SidebarBigComponent {
    @ViewChild('sidebarBig') sidebar!: ElementRef<HTMLDivElement>;
    protected readonly pages = pages;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _sidebarService: SidebarChangerService,
        private _renderer: Renderer2,
    ) {}

    toggleSideBarMouseOver(): void {
        this.sidebar.nativeElement.classList.remove('transform-none');
    }

    onNavigate(link: string | undefined): void {
        this._router.navigate([link]);
    }

    onBigSidebar(): void {
        this._sidebarService.emitButtonClick();
    }

    toggleSidebar(): void {
        const sidebarClassList = this.sidebar.nativeElement.classList;
        sidebarClassList.contains('transform-none')
            ? sidebarClassList.remove('transform-none')
            : sidebarClassList.add('transform-none');
    }
    onClickSignOut(): void {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
    }
}

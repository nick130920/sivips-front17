import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { Pages } from '@lib/interfaces';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
    pages: Pages[] = [{ title: 'Home', link: '/home', icon: 'icon-[iconamoon--home-fill]' }];

    constructor(private _router: Router, private _authService: AuthService) {}

    onClickSignOut(): void {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
    }

    onNavigate(link: string): void {
        this._router.navigate([link]);
    }

    toggleSidebar(): void {
        const sidebarClassList = this.sidebar.nativeElement.classList;
        sidebarClassList.contains('transform-none')
            ? sidebarClassList.remove('transform-none')
            : sidebarClassList.add('transform-none');
    }

    toggleSideBarMouseOver(): void {
        this.sidebar.nativeElement.classList.remove('transform-none');
    }
}

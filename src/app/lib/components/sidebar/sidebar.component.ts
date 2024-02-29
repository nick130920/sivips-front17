import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { SidebarBigComponent } from '../sidebar-big/sidebar-big.component';
import { SidebarSmallComponent } from '../sidebar-small/sidebar-small.component';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarBigComponent, SidebarSmallComponent],
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnChanges {
    private _isAuthenticated = false;
    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

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
        this._authService.isAuthenticated$.subscribe((isAuthenticated) => {
            this._isAuthenticated = isAuthenticated;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes, '----------');
    }

    onButtonClick(): void {
        this.isMallSide = !this.isMallSide;
    }
}

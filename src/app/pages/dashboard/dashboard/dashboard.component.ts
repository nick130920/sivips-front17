import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '@lib/components';
import { RouterModule } from '@angular/router';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgIf, SidebarComponent, RouterModule],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    isMallSide = false;

    constructor(private _sidebarService: SidebarChangerService) {
        this._sidebarService.buttonClicked$.subscribe(() => {
            this.isMallSide = !this.isMallSide;
        });
    }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { NavbarComponent } from '@lib/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent],
    templateUrl: './app.component.html',
    providers: [],
})
export class AppComponent implements OnInit {
    isAuthenticated$ = inject(AuthService).isAuthenticated;

    ngOnInit(): void {
        console.log('Theme:', this.isAuthenticated$);
    }
}

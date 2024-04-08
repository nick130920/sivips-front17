import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { SidebarComponent } from '@lib/components';
import { SidebarChangerService } from '@lib/services/responsive/sidebar-changer.service';
import { AppComponent } from './app.component';
import { PrimeNGConfig } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app.config';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
    primeConfig.ripple = true;
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        RouterModule,
        SidebarComponent,
        BrowserModule,
        ButtonModule,
        RippleModule,
        HttpClientModule,
    ],
    providers: [
        AuthService,
        SidebarChangerService,
        appConfig.providers,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [PrimeNGConfig],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

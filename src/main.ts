import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/*bootstrapApplication(AppModule, appConfig).catch((error) => {
    console.error(error);
});*/
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));

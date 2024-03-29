import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { authInterceptor } from './app/security/auth.interceptor';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PictureService } from './app/picture/picture.service';
import { ListeAchatVentePage } from './app/layout/liste-achat-vente/liste-achat-vente.page';
import { AchatVenteService } from './app/achatvente/achat-vente.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    provideHttpClient(withInterceptors([authInterceptor])),
    PictureService,
    ListeAchatVentePage,
    AchatVenteService,
  ],
})
  .then(() => defineCustomElements(window)) // Add this line
  .catch((err) => console.log(err));

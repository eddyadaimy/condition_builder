import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from 'environments/environment';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  if ('serviceWorker' in navigator ) {
    navigator.serviceWorker.register('./ngsw-worker.js');
  }

  if (environment.production) {
    enableProdMode();
  }

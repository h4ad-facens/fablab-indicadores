import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import localeFr from '@angular/common/locales/pt-PT';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LocalStorage, StorageModule } from '@ngx-pwa/local-storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { httpAsyncFactory } from './factories/http-async/http-async.factory';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpAsyncService } from './services/http-async/http-async.service';

registerLocaleData(localeFr, 'pt-PT');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [
    LocalStorage,
    { provide: HttpAsyncService, useFactory: httpAsyncFactory, deps: [HttpClient] }
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule {
}

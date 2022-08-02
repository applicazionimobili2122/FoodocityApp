import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import {HttpClientModule} from '@angular/common/http';


import localeIt from '@angular/common/locales/it';
import {registerLocaleData} from '@angular/common';
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen';

registerLocaleData(localeIt);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, IonicStorageModule.forRoot({
    name: 'foodocity'}),
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

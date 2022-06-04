// ModulesApp
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';

// INTERCEPTORS
import { interceptorProviders } from '@interceptors/interceptors';

//DATE LOCAL
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData, AsyncPipe } from '@angular/common';
registerLocaleData(es, "MXN");

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule,
  AppRoutingModule,
  CoreModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [...MODULES],
  providers: [
    interceptorProviders,
    { provide: LOCALE_ID, useValue: 'MXN' }, 
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

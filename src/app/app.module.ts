// ModulesApp
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { StudentDialogComponent } from './student-view/student-dialog/student-dialog.component';
import { TeacherDialogComponent } from './teacher-view/teacher-dialog/teacher-dialog.component';

// INTERCEPTORS
import { interceptorProviders } from '@interceptors/interceptors';

//DATE LOCAL
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData, AsyncPipe } from '@angular/common';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { GradeViewComponent } from './grade-view/grade-view.component';
registerLocaleData(es, "MXN");

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule,
  AppRoutingModule,
  CoreModule,
  SharedModule
];

const COMPONENTS = [
  AppComponent,
  StudentViewComponent,
  TeacherViewComponent,
  GradeViewComponent,
  GradeViewComponent,
  StudentDialogComponent,
  TeacherDialogComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [
    interceptorProviders,
    { provide: LOCALE_ID, useValue: 'MXN' },
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

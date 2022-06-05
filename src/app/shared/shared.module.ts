import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ModulesAngularMaterial
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule }    from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntlSpanish } from './MatPaginatorIntlSpanish';
import { NgxSpinnerModule } from "ngx-spinner";


// PIPES
import { StringIsNullPipe } from './pipes/string-is-null/string-is-null.pipe';

// COMPONENTS
import { ToolbarDialogComponent } from '@shared/components/toolbar-dialog/toolbar-dialog.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

const MODULES_ANGULAR_MATERIAL = [
  MatBadgeModule,
  MatButtonModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatTabsModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule
];

const MODULES = [
  ...MODULES_ANGULAR_MATERIAL,
  DragDropModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxSpinnerModule
];



const COMPONENTS = [
  ToolbarDialogComponent,
  SpinnerComponent,
];

const PIPES = [
  StringIsNullPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [...MODULES],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-GB'
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlSpanish
    },
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class SharedModule { }

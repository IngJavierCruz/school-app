import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { GradeViewComponent } from './grade-view/grade-view.component';

const routes: Routes = [
  {
    path: 'estudiantes',
    component: StudentViewComponent
  },
  {
    path: 'maestros',
    component: TeacherViewComponent
  },
  {
    path: 'grados',
    component: GradeViewComponent
  },
  // {
  //   path: 'estudiante-grados',
  //   component: LayoutComponent
  // },
  {
    path: '**',
    redirectTo: 'estudiantes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

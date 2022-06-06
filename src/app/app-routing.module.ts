import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { GradeViewComponent } from './grade-view/grade-view.component';
import { StudentGradeViewComponent } from './student-grade-view/student-grade-view.component';

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
  {
    path: 'estudiantes-grados',
    component: StudentGradeViewComponent
  },
  {
    path: '**',
    redirectTo: 'estudiantes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

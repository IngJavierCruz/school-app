import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// MODELOS
import { Grade } from '@models/grade/Grade';
import { Student } from '@models/student/Student';
import { StudentGrade } from '@models/student_grade/StudentGrade';

// SERVICES
import { GradeService } from '@services/grade.service';
import { StudentService } from '@services/student.service';
import { StudentGradeService } from '@services/student-grade.service';

@Component({
  selector: 'app-student-grade-dialog',
  templateUrl: './student-grade-dialog.component.html',
  styleUrls: ['./student-grade-dialog.component.scss']
})
export class StudentGradeDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form: FormGroup;
  students: Student[] = [];
  grades: Grade[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentGrade,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlert2Service,
    private studetGradeService: StudentGradeService,
    private gradeService: GradeService,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.getAllStudents();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      seccion: ["", Validators.required],
      student: ["", Validators.required],
      grade: ["", Validators.required],
    });
  }

  get formControl() { return this.form.controls; }

  close() {
    this.dialogRef.close();
  }

  endTransaction() {
    this.dialogRef.close(true);
  }

  getAllStudents() {
    this.subscription.add(this.studentService.getAll()
    .subscribe({
      next: ({ data }) => {
        this.students = data as Student[];
        this.getAllGrades();
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar cargar los estudiantes!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  getAllGrades() {
    this.subscription.add(this.gradeService.getAll()
    .subscribe({
      next: ({ data }) => {
        this.grades = data as Grade[];
        this.loadData();
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar cargar los grados!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  loadData() {
    if (this.data) {
      const { seccion, studentId, gradeId } = this.data;
      this.formControl['seccion'].setValue(seccion);
      this.formControl['student'].setValue(studentId);
      this.formControl['grade'].setValue(gradeId);
    }
  }

  initTransaction() {
    this.spinner.show();
    if (this.data) {
      this.update();
    } else {
      this.save();
    }
  }

  createPayload(): StudentGrade {
    return {
      ...(this.data && { id: this.data.id }),
      seccion: this.formControl['seccion'].value,
      studentId: this.formControl['student'].value,
      gradeId: this.formControl['grade'].value,
    }
  }

  save() {
    const data = this.createPayload();
    this.subscription.add(this.studetGradeService.save(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Registro agregado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar agregar un registro!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar agregar un registro!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  update() {
    const data = this.createPayload();
    this.subscription.add(this.studetGradeService.update(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("Registro actualizado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar actualizar el registro!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar actualizar el registro!");
      },
      complete: () => this.spinner.hide()
    }));
  }

}

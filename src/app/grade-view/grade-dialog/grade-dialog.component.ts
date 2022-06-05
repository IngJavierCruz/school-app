import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// MODELOS
import { Grade } from '@models/grade/Grade';
import { Teacher } from '@models/teacher/Teacher';

// SERVICES
import { GradeService } from '@services/grade.service';
import { TeacherService } from '@services/teacher.service';

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.scss']
})
export class GradeDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form: FormGroup;
  teachers: Teacher[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grade,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlert2Service,
    private gradeService: GradeService,
    private teacherService: TeacherService,
  ) { }

  ngOnInit() {
    this.getAllTeachers();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      teacher: ["", Validators.required],
    });
  }

  get formControl() { return this.form.controls; }

  close() {
    this.dialogRef.close();
  }

  endTransaction() {
    this.dialogRef.close(true);
  }

  getAllTeachers() {
    this.subscription.add(this.teacherService.getAll()
    .subscribe({
      next: ({ data }) => {
        this.teachers = data as Teacher[];
        this.loadData();
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar cargar los maestros!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  loadData() {
    if (this.data) {
      const { name, teacherId } = this.data;
      this.formControl['name'].setValue(name);
      this.formControl['teacher'].setValue(teacherId);
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

  createPayload(): Grade {
    return {
      ...(this.data && { id: this.data.id }),
      name: this.formControl['name'].value,
      teacherId: this.formControl['teacher'].value,
    }
  }

  save() {
    const data = this.createPayload();
    this.subscription.add(this.gradeService.save(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Grado agregado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar agregar un grado!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar agregar un grado!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  update() {
    const data = this.createPayload();
    this.subscription.add(this.gradeService.update(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Grado actualizado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar actualizar un grado!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar actualizar un grado!");
      },
      complete: () => this.spinner.hide()
    }));
  }

}

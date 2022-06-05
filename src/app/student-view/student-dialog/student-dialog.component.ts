import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// MODELOS
import { Student } from '@models/student/Student';

// SERVICES
import { StudentService } from '@services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlert2Service,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [false, Validators.required],
      birthday: ["", Validators.required],
    });
  }

  get formControl() { return this.form.controls; }

  close() {
    this.dialogRef.close();
  }

  endTransaction() {
    this.dialogRef.close(true);
  }

  loadData() {
    if (this.data) {
      const { name, lastName, gender, birthday } = this.data;
      this.formControl['name'].setValue(name);
      this.formControl['lastName'].setValue(lastName);
      this.formControl['gender'].setValue(gender);
      this.formControl['birthday'].setValue(birthday);
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

  createPayload(): Student {
    return {
      ...(this.data && { id: this.data.id }),
      name: this.formControl['name'].value,
      lastName: this.formControl['lastName'].value,
      gender: this.formControl['gender'].value,
      birthday: this.formControl['birthday'].value,
    }
  }

  save() {
    const data = this.createPayload();
    this.subscription.add(this.studentService.save(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Estudiante agregado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar agregar un estudiante!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar agregar un estudiante!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  update() {
    const data = this.createPayload();
    this.subscription.add(this.studentService.update(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Estudiante actualizado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar actualizar un estudiante!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar actualizar un estudiante!");
      },
      complete: () => this.spinner.hide()
    }));
  }

}

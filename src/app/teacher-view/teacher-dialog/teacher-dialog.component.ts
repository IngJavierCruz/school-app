import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// MODELOS
import { Teacher } from '@models/teacher/Teacher';

// SERVICES
import { TeacherService } from '@services/teacher.service';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss']
})
export class TeacherDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher,
    private spinner: NgxSpinnerService,
    private sweetAlert: SweetAlert2Service,
    private teacherService: TeacherService,
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
      const { name, lastName, gender } = this.data;
      this.formControl['name'].setValue(name);
      this.formControl['lastName'].setValue(lastName);
      this.formControl['gender'].setValue(gender);
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

  createPayload(): Teacher {
    return {
      ...(this.data && { id: this.data.id }),
      name: this.formControl['name'].value,
      lastName: this.formControl['lastName'].value,
      gender: this.formControl['gender'].value,
    }
  }

  save() {
    const data = this.createPayload();
    this.subscription.add(this.teacherService.save(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Maestro agregado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar agregar un maestro!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar agregar un maestro!");
      },
      complete: () => this.spinner.hide()
    }));
  }

  update() {
    const data = this.createPayload();
    this.subscription.add(this.teacherService.update(data)
    .subscribe({
      next: ({ success }) => {
        if (success) {
          this.sweetAlert.showAlertSuccess("¡Maestro actualizado!")
          this.endTransaction();
        } else {
          this.sweetAlert.showAlertError("¡Error al intentar actualizar un maestro!");
        }
      },
      error: (err) => {
        console.error(err.message);
        this.sweetAlert.showAlertError("¡Error al intentar actualizar un maestro!");
      },
      complete: () => this.spinner.hide()
    }));
  }

}

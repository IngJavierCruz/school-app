import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';

// SERVICES
import { TeacherService } from '@services/teacher.service';

import { NgxSpinnerService } from 'ngx-spinner';

// MODELS
import { Teacher } from '@models/teacher/Teacher';
import { COLUMNS } from './columns';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.scss']
})
export class TeacherViewComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<Teacher>([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private teacherService: TeacherService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Service: SweetAlert2Service,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.getAllTeachers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllTeachers() {
    this.spinner.show();
    this.subscription.add(this.teacherService.getAll()
    .subscribe({
      next: ({ data, success }) => {
        if (success)
          this.dataSource.data = data as Teacher[];
      },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide()
    }));
  }

  addTeacher() {
    this.showTeacherDialog();
  }

  editTeacher(student: Teacher) {
    this.showTeacherDialog(student);
  }

  showTeacherDialog(student?: Teacher) {
    const dialogRef = this.dialog.open(TeacherDialogComponent, { data: student, disableClose: true });
    this.subscription.add(dialogRef.afterClosed()
    .subscribe(success => {
      if (success)
        this.getAllTeachers();
    }));
  }

  async deleteTeacher(teacher: Teacher) {
    if (await this.sweetAlert2Service.dialogConfirmElimination()) {
      this.spinner.show();
      this.subscription.add(this.teacherService.delete(teacher.id)
      .subscribe({
        next: ({ success, message }) => {
          if (success) {
            this.getAllTeachers();
          } else {
            this.sweetAlert2Service.showAlertError(message);
          }
        },
        error: (e) => {
          console.error(e);
          this.sweetAlert2Service.showAlertError(e.message);
          this.spinner.hide();
        },
        complete: () => this.spinner.hide()
      }));
    }
  }

}

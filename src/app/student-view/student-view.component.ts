import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

// SERVICES
import { StudentService } from '@services/student.service';

import { NgxSpinnerService } from 'ngx-spinner';

// MODELS
import { Student } from '@models/student/Student';
import { COLUMNS } from './columns';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<Student>([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Service: SweetAlert2Service,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllStudents() {
    this.spinner.show();
    this.subscription.add(this.studentService.getAll()
    .subscribe({
      next: ({ data, success }) => {
        if (success)
          this.dataSource.data = data as Student[];
      },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide()
    }));
  }

  addStudent() {
    this.showStudentDialog();
  }

  editStudent(student: Student) {
    this.showStudentDialog(student);
  }

  showStudentDialog(student?: Student) {
    const dialogRef = this.dialog.open(StudentDialogComponent, { data: student, disableClose: true });
    this.subscription.add(dialogRef.afterClosed()
    .subscribe(success => {
      if (success)
        this.getAllStudents();
    }));
  }

  async deleteStudent(student: Student) {
    if (await this.sweetAlert2Service.dialogConfirmElimination()) {
      this.spinner.show();
      this.subscription.add(this.studentService.delete(student.id)
      .subscribe({
        next: ({ success }) => {
          if (success)
            this.getAllStudents();
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

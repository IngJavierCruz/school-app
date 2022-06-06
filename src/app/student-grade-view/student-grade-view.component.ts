import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS
import { StudentGradeDialogComponent } from './student-grade-dialog/student-grade-dialog.component';

// SERVICES
import { StudentGradeService } from '@services/student-grade.service';

import { NgxSpinnerService } from 'ngx-spinner';

// MODELS
import { StudentGrade } from '@models/student_grade/StudentGrade';
import { COLUMNS } from './columns';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

@Component({
  selector: 'app-student-studentGrade-view',
  templateUrl: './student-grade-view.component.html',
  styleUrls: ['./student-grade-view.component.scss']
})
export class StudentGradeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<StudentGrade>([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private studentGradeService: StudentGradeService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Service: SweetAlert2Service,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.getAllStudentGrades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllStudentGrades() {
    this.spinner.show();
    this.subscription.add(this.studentGradeService.getAll()
    .subscribe({
      next: ({ data, success }) => {
        if (success)
          this.dataSource.data = data as StudentGrade[];
      },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide()
    }));
  }

  addAssignment() {
    this.showGradeDialog();
  }

  editAssignment(studentGrade: StudentGrade) {
    this.showGradeDialog(studentGrade);
  }

  showGradeDialog(studentGrade?: StudentGrade) {
    const dialogRef = this.dialog.open(StudentGradeDialogComponent, { data: studentGrade, disableClose: true });
    this.subscription.add(dialogRef.afterClosed()
    .subscribe(success => {
      if (success)
        this.getAllStudentGrades();
    }));
  }

  async deleteAssignment(studentGrade: StudentGrade) {
    if (await this.sweetAlert2Service.dialogConfirmElimination()) {
      this.spinner.show();
      this.subscription.add(this.studentGradeService.delete(studentGrade.id)
      .subscribe({
        next: ({ success }) => {
          if (success)
            this.getAllStudentGrades();
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
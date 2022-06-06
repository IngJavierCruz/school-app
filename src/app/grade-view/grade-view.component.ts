import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog';

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';

// SERVICES
import { GradeService } from '@services/grade.service';

import { NgxSpinnerService } from 'ngx-spinner';

// MODELS
import { Grade } from '@models/grade/Grade';
import { COLUMNS } from './columns';
import { SweetAlert2Service } from '@services/sweet-alert2.service';

@Component({
  selector: 'app-grade-view',
  templateUrl: './grade-view.component.html',
  styleUrls: ['./grade-view.component.scss']
})
export class GradeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<Grade>([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private gradeService: GradeService,
    private spinner: NgxSpinnerService,
    private sweetAlert2Service: SweetAlert2Service,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.getAllGrades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllGrades() {
    this.spinner.show();
    this.subscription.add(this.gradeService.getAll()
    .subscribe({
      next: ({ data, success }) => {
        if (success)
          this.dataSource.data = data as Grade[];
      },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide()
    }));
  }

  addGrade() {
    this.showGradeDialog();
  }

  editGrade(grade: Grade) {
    this.showGradeDialog(grade);
  }

  showGradeDialog(grade?: Grade) {
    const dialogRef = this.dialog.open(GradeDialogComponent, { data: grade, disableClose: true });
    this.subscription.add(dialogRef.afterClosed()
    .subscribe(success => {
      if (success)
        this.getAllGrades();
    }));
  }

  async deleteGrade(grade: Grade) {
    if (await this.sweetAlert2Service.dialogConfirmElimination()) {
      this.spinner.show();
      this.subscription.add(this.gradeService.delete(grade.id)
      .subscribe({
        next: ({ success, message }) => {
          if (success) {
            this.getAllGrades();
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
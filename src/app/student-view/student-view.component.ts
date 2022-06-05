import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS

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

  editStudent(student: Student) {
    alert("editar")
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
        error: (e) => console.error(e),
        complete: () => this.spinner.hide()
      }));
    }
  }
}

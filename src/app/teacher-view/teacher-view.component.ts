import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'

// RXJS
import { Subscription } from 'rxjs/internal/Subscription';

// COMPONENTS

// SERVICES
import { TeacherService } from '@services/teacher.service';

import { NgxSpinnerService } from 'ngx-spinner';

// MODELS
import { Teacher } from '@models/teacher/Teacher';
import { COLUMNS } from './columns';

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
    private spinner: NgxSpinnerService
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

  editTeacher(teacher: Teacher) {
    alert("editar")
  }

  deleteTeacher(teacher: Teacher) {
    alert("eliminar")
  }

}

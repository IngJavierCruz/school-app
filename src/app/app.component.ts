import { Component } from '@angular/core';
import { StudentService } from '@core/services/student.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-app';

  constructor(private studentService: StudentService) {
    this.studentService.getAll().subscribe(x => {
      console.log(x);
    });

    this.studentService.getById("d98361f8-c2e2-4a94-873e-14fc649dca62").subscribe(x => {
      console.log(x);
    });

    // this.studentService.save({
    //   name: "Regina",
    //   lastName: "Villatoro",
    //   gender: false,
    //   birthday: new Date("2019-10-06T15:00:53"),
    // }).subscribe(x => {
    //   console.log("YUsuario creado: ", x);
    // });

    this.studentService.update({
      id: "3b71c037-9913-45ac-b841-fda6ab9926e6",
      name: "Regina Kailany",
      lastName: "Villatoro",
      gender: false,
      birthday: new Date("2019-10-06T15:00:53"),
    }).subscribe(x => {
      console.log("YUsuario actualizado: ", x);
    });
  }
}

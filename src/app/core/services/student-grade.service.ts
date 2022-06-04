import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataResponse } from '@models/data/data-response';
import { StudentGrade } from '@models/student_grade/StudentGrade';

@Injectable({
  providedIn: 'root'
})
export class StudentGradeService {
  private url = `${environment.host}/studentsGrade`;

  constructor(private http: HttpClient) {}

  getById(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<DataResponse>(apiUrl);
  }

  getAll() {
    return this.http.get<DataResponse>(this.url);
  }

  save(studentGrade: StudentGrade) {
    return this.http.post<DataResponse>(this.url, studentGrade);
  }

  update(studentGrade: StudentGrade) {
    return this.http.put<DataResponse>(this.url, studentGrade);
  }

  delete(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<DataResponse>(apiUrl);
  }
}

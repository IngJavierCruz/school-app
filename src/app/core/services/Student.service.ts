import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataResponse } from '@models/data/data-response';
import { Student } from '@models/student/Student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = `${environment.host}/student`;

  constructor(private http: HttpClient) {}

  getById(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<DataResponse>(apiUrl);
  }

  getAll() {
    return this.http.get<DataResponse>(this.url);
  }

  save(student: Student) {
    return this.http.post<DataResponse>(this.url, student);
  }

  update(student: Student) {
    return this.http.put<DataResponse>(this.url, student);
  }

  delete(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<DataResponse>(apiUrl);
  }
}

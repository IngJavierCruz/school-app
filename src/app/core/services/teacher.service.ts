import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataResponse } from '@models/data/data-response';
import { Teacher } from '@models/teacher/Teacher';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = `${environment.host}/teacher`;

  constructor(private http: HttpClient) {}

  getById(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<DataResponse>(apiUrl);
  }

  getAll() {
    return this.http.get<DataResponse>(this.url);
  }

  save(teacher: Teacher) {
    return this.http.post<DataResponse>(this.url, teacher);
  }

  update(teacher: Teacher) {
    return this.http.put<DataResponse>(this.url, teacher);
  }

  delete(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<DataResponse>(apiUrl);
  }
}

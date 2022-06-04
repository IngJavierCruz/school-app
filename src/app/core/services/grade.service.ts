import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DataResponse } from '@models/data/data-response';
import { Grade } from '@models/grade/Grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private url = `${environment.host}/grade`;

  constructor(private http: HttpClient) {}

  getById(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<DataResponse>(apiUrl);
  }

  getAll() {
    return this.http.get<DataResponse>(this.url);
  }

  save(grade: Grade) {
    return this.http.post<DataResponse>(this.url, grade);
  }

  update(grade: Grade) {
    return this.http.put<DataResponse>(this.url, grade);
  }

  delete(id: string) {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<DataResponse>(apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<any[]>('/api/courses');
  }

  create(course: any) {
    return this.http.post('/api/courses', course);
  }

  update(id: number, course: any) {
    return this.http.put(`/api/courses/${id}`, course);
  }

  delete(id: number) {
    return this.http.delete(`/api/courses/${id}`);
  }
}

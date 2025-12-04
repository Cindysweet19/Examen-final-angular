import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<any[]>('/api/users');
  }

  create(user: any) {
    return this.http.post('/api/users', user);
  }

  update(id: number, user: any) {
    return this.http.put(`/api/users/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`/api/users/${id}`);
  }
}

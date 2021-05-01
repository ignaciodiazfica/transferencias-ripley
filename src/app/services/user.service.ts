import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>('/api/users/all');
  }

  getUserAuthenticated() {
    return this.http.get<any>('/api/users');
  }
  postUser(user: any) {
    return this.http.post<any>('/api/users', user);
  }
  putUser(userId: string, user: any) {
    return this.http.put<any>(`/api/users/${userId}`, user);
  }
  deleteUser(userId: string) {
    return this.http.delete<any>(`/api/users/${userId}`);
  }
}

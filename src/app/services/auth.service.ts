import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let obj = {
      username,
      password,
    };
    return this.http.post<any>('/api/auth/', obj);
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
}

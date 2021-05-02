import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    let obj = {
      username,
      password,
    };
    return this.http.post<any>('/api/auth/', obj);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login'])
  }
}

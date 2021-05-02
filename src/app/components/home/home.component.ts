import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public mensajeBienvenida: any;
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.getDataDefault();
  }

  getDataDefault() {
    this.userService
      .getUserAuthenticated()
      .pipe(take(1))
      .subscribe((res) => {
        this.mensajeBienvenida = res.name ? `Hola, ${res.name}!` : 'Hola!';
      });
  }
}

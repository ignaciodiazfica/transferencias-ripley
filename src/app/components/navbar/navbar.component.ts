import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public authenticated = false;
  constructor(private authService: AuthService) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.authenticated = true;
    }
  }

  ngOnInit(): void {}
  handleOnClick() {
    this.authService.logout();
    window.location.reload();
  }
}

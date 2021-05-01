import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res) => {
          if (res && res.token) {
            localStorage.setItem('jwtToken', res.token);
            this.router.navigate(['/recipient']);
          }
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de Autenticación',
            detail: 'Usuario o contraseña incorrecta',
          });
        }
      );
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}

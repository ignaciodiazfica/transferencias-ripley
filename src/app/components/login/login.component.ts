import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public submitted = false;
  public showNewUser = false;
  public signUpForm: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.router.navigate(['/home']);
    }
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

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
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
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res) => {
          if (res && res.token) {
            localStorage.setItem('jwtToken', res.token);
          }
          this.router.navigate(['/home']);
          window.location.reload();
          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenido',
            detail: 'Ha iniciado sesión correctamente',
          });
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

  handleSignUpButtom() {
    this.showNewUser = true;
  }

  saveNewUser() {
    let newUser = this.signUpForm.value;

    this.userService
      .postUser(newUser)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registrado correctamente',
            detail: 'Se ha registrado correctamente',
          });
          this.showNewUser = false;
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al registrarse',
            detail:
              'Parece que ha habido un error... \nPor favor intente nuevamente',
          });
        }
      );
  }
}

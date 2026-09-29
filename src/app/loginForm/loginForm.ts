import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUser } from '../models/loginUser';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './loginForm.html',
  styleUrl: './loginForm.scss'
})
export class LoginFormComponent {
  errorMessage = signal('');
  constructor(
    private userService: UserService
  ) { }
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  login() {
    const user: LoginUser = {
      login: this.loginForm.value.login ?? '',
      password: this.loginForm.value.password ?? ''
    };

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.loginUser(user).subscribe({
      next: loggedInUser => {
        this.errorMessage.set('');
        this.userService.currentUser.set(loggedInUser);
      },
      error: error => {
        this.errorMessage.set(error.error.message);
      }
    });
  }
}

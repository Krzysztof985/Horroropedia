import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../models/registerUser';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registerForm.html',
  styleUrl: './registerForm.scss'
})
export class RegisterFormComponent {
  errorMessage = signal('');
  
  constructor(
    private userService: UserService
  ) { }

  registerForm = new FormGroup({
    nick: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  register() {
    const user: RegisterUser = {
      nick: this.registerForm.value.nick ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? ''
    };

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.addUser(user).subscribe({
      next: newUser => {
      },
      error: error => {
        this.errorMessage.set(error.error.message);
      }
    });
  }
}

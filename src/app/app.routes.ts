import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Games } from './games/games';
import { Books } from './books/books';
import { RegisterFormComponent } from './registerForm/registerForm';
import { LoginFormComponent } from './loginForm/loginForm';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'games', component: Games },
  { path: 'books', component: Books },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent }
];

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = signal<User[]>([]);

  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/api/users')
      .subscribe(users => {
        this.users.set(users);
      });
  }

  addUser(user: RegisterUser) {
    return this.http.post<User>(
      'http://localhost:3000/api/users',
      user
    );
  }

  loginUser(user: LoginUser) {
    return this.http.post<User>(
      'http://localhost:3000/api/users/login',
      user
    );
  }

  getUserById(id: number) {
    return this.users().find(user => user.id === id);
  }
  logout() {
    this.currentUser.set(null);
  }
}

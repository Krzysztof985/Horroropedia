import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = signal<User[]>([]);

  currentUser: User = {
    id: 1,
    nick: 'Jan',
    email: 'jan@example.com',
    dateOfJoining: '2026-09-01',
    rank: 'user'
  };

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

  getUserById(id: number) {
    return this.users().find(user => user.id === id);
  }
}
